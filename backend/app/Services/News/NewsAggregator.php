<?php

namespace App\Services\News;

use App\Http\Resources\News\NewsResource;
use App\Services\Utils\Session\News\NewsSessionManager;
use App\Services\Utils\Session\News\NewsTokenGenerator;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class NewsAggregator
{

    protected $newsServiceFactory, $newsSessionManager, $newsTokenGenerator;

    public function __construct(NewsServiceFactory $newsServiceFactory)
    {
        $this->newsServiceFactory = $newsServiceFactory;
    }

    public function getNewsWithFilters(array $filters, $userPreferences = null)
    {

        $page = $filters['page'];

        // Prioritize user preferences first, fallback to filters if not available
        $categories = $userPreferences['categories'] ?? $filters['categories'] ?? [];
        $sources = $userPreferences['sources'] ?? $filters['sources'] ?? null;

        // Update the filter with the categories
        $filters['categories'] = $categories;

        // Determine if all sources are included
        $isAllSources = empty($sources) || !is_array($sources);

        // Get the available news sources
        $newsSources = NewsSources::getSourcesKeys();

        // Filter the sources based on the filter
        $newsSourcesToFetch = array_filter($newsSources, function ($source) use ($isAllSources, $sources) {
            // If not all sources are selected and the current source is not in the list, skip it
            return $isAllSources || in_array($source, $sources);
        });


        if ($page == 1) {
            return $this->getNewsWithFiltersInit($filters, $newsSourcesToFetch);
        } else {
            return $this->getNewsWithFiltersPagination($filters);
        }
    }


    private function prepareNewsCounts(array $newsResults): array
    {
        $newsCounts = [];

        foreach ($newsResults as $source => $formattedResponse) {

            $count = $formattedResponse['totalResults'] ?? 0;

            if ($count == 0) {continue;}

            $newsCounts[$source] = $count;
        }

        return $newsCounts;
    }

    private function preparePaginationArray(array $newsCounts, int $pageSize): array
    {

        $totalCount = array_sum($newsCounts);

        return [
            'pageSize' => $pageSize,
            'total' => array_sum($newsCounts),
            'totalPages' => ceil($totalCount / $pageSize),
        ];
    }

    private function getNewsWithFiltersInit($filters, $newsSourcesToFetch)
    {

        $page = $filters['page'];
        $pageSize = $filters['pageSize'];

        try {

            // Prepare the HTTP requests for each source using the Laravel HTTP pool
            $responses = Http::pool(function ($pool) use ($newsSourcesToFetch, $filters, $page, $pageSize) {
                foreach ($newsSourcesToFetch as $source) {

                    // Get the news service for the source and prepare the HTTP request
                    $newsService = $this->newsServiceFactory->createService($source);

                    // Get the URL and filters for each request
                    $newsRequest = $newsService->getNewsWithFilters($filters, $page, $pageSize);

                    // Add to pool using the URL and filters
                    $pool->as($source)
                        ->{$newsRequest['method']}($newsRequest['url'], $newsRequest['filters']);
                }
            });

            // Handle and process the responses from each source
            $newsResults = [];
            $errors = [];
            $isAllFail = true;
            $fetchedArticles = 0;
            foreach ($responses as $source => $response) {

                if (!is_null($response) && method_exists($response, 'status') && $response->ok()) {

                    // Format the response using the news service
                    $formattedResponse = $this->newsServiceFactory->createService($source)->responseFormatter($response);

                    // If not success then continue
                    if (!$formattedResponse['success']) {  continue;  }

                    // If $fetchArticles is greater than or equal to the page size then set the $formattedResponse['data'] to the empty, so the front end will only get the close to the page size articles
                    if ($fetchedArticles >= $pageSize) {
                        $formattedResponse['data'] = [];
                    }

                    // Add the formatted response to the results array
                    $newsResults[$source] = $formattedResponse;

                    $fetchedArticles += count($formattedResponse['data']);

                    $isAllFail = false;

                } else {
                    
                    // Handle the error
                    $errors[$source] = [
                        'status' => '400', //$response->status(),
                        'error' =>  'Faield to get the articles' //$response->body(),
                    ];
                }
            }


            $newsCounts = $this->prepareNewsCounts($newsResults);
            $pagination = $this->preparePaginationArray($newsCounts, $pageSize);


            // Ready the data
            $data = [
                'isAllFail' => $isAllFail,
                'news' => $newsResults,
                'pagination' => $pagination,
                'sourceData' => $newsCounts,
            ];

            // Ready the resource
            return new NewsResource($data);

        } catch (ConnectionException $e) {

            return new NewsResource([
                'isAllFail' => true,
            ]);
        }
    }


    private function getNewsWithFiltersPagination($filters)
    {


        $page = $filters['page'];
        $pageSize = $filters['pageSize'];
        $sourceData = $filters['sourceData'];

        $sourceApiToCall = $this->getSourceListForApiCall($sourceData, $page, $pageSize);

        // Prepare the HTTP requests for each source using the Laravel HTTP pool
        $responses = Http::pool(function ($pool) use ($sourceApiToCall, $filters, $pageSize) {
            foreach ($sourceApiToCall as $source) {

                $sourceKey = $source['source'];
                $sourcePage = $source['page'];

                // Get the news service for the source and prepare the HTTP request
                $newsService = $this->newsServiceFactory->createService($sourceKey);

                // Get the URL and filters for each request
                $newsRequest = $newsService->getNewsWithFilters($filters, $sourcePage, $pageSize);

                // Add to pool using the URL and filters
                $pool->as($sourceKey)
                    ->{$newsRequest['method']}($newsRequest['url'], $newsRequest['filters']);
            }
        });

        // Handle and process the responses from each source
        $newsResults = [];
        $errors = [];
        $isAllFail = true;
        foreach ($responses as $source => $response) {

            if ($response->successful()) {

                // Format the response using the news service
                $formattedResponse = $this->newsServiceFactory->createService($source)->responseFormatter($response);

                // Add the formatted response to the results array
                $newsResults[$source] = $formattedResponse;

                $isAllFail = false;
            } else {

                // Handle the error
                $errors[$source] = [
                    'status' => $response->status(),
                    'error' => $response->body(),
                ];
            }
        }

        return new NewsResource([
            'isAllFail' => $isAllFail,
            'news' => $newsResults,
        ]);
    }

    private function getSourceListForApiCall($sourceData, $page, $pageSize)
    {

        $articlesFetchRemainig = $pageSize; // How many articles we need to fetch

        // Calculate the total available articles from the source data
        $totalArticles = array_sum($sourceData);


        $utilizedSources = [];
        $apiToCall = [];
        $totalArticlesUsed = 0;

        // Loop through the pages to find the sources
        for ($i = 1; $i <= $page; $i++) {

            // For each page, reset the number of articles we need to fetch
            $articlesFetchRemainig = $pageSize;


            // If all articles are fetched then break the loop
            if ($totalArticlesUsed >= $totalArticles) {
                break;
            }


            // Loop through the sources
            foreach ($sourceData as $source => $totalResults) {

                // Determine how many articles we've already used from this source
                $usedArticles = $utilizedSources[$source]['usedArticles'] ?? 0;

                // if used articles is equal to total results then continue
                if ($usedArticles == $totalResults) {
                    continue;
                }

                // Calculate how many articles are left in this source
                $sourceRemainingArticles = $totalResults - $usedArticles;

                // Calculate the page number to be call for this api to fetch new articles
                $pageToCall = ($usedArticles / $pageSize) + 1;

                // if it's the last page then add the source to api array
                if ($i == $page) {

                    $apiToCall[] = [
                        'source' => $source,
                        'page' => $pageToCall
                    ];
                }

                // If we have enough articles in this source then update the used articles and continue
                if ($sourceRemainingArticles >= $articlesFetchRemainig) {

                    // Picked chunks of articles from this source, as we have enough articles and from previous sources the some articles can be fetched so instead of adding the remianing we will add the page size articles because we will be returning the all articles from this source for the current page and we have to check if the api source remaining articles are greater than the page size then we will add the page size articles otherwise we will add the remaining articles
                    $articlesChunkedUsed = ($articlesFetchRemainig < $pageSize && $pageSize <= $sourceRemainingArticles) ? $pageSize : $articlesFetchRemainig;

                    // Update the used articles for this source
                    $utilizedSources[$source]['usedArticles'] = $usedArticles + $articlesChunkedUsed;

                    $totalArticlesUsed += $articlesChunkedUsed;

                    // Update the results needed
                    $articlesFetchRemainig = 0;

                    // Break out of the loop as we have enough articles
                    break;
                }


                // We are here it means we don't have enough articles in this source so update the used articles
                $utilizedSources[$source]['usedArticles'] = $totalResults;

                // Update the $articlesFetchRemainig
                $articlesFetchRemainig -= $sourceRemainingArticles;

                $totalArticlesUsed += $sourceRemainingArticles;
            }
        }

        return $apiToCall;
    }
}
