<?php

namespace App\Services\News\Providers;

use App\Services\News\CategoryMapping;
use Illuminate\Support\Facades\Http;
use App\Services\News\BaseNewsProviderService;
use App\Services\News\NewsSources;

class NyTimesAPIService extends BaseNewsProviderService
{
    protected $apiUrl;
    protected $apiKey;
    protected $categoryMapping;
    protected $serviceName = 'nytimes';

    public function __construct()
    {
        // Pass service name to the parent constructor
        parent::__construct($this->serviceName);
    }


    public function getNewsWithFilters(array $filters, int $page = 1, int $pageSize = 10)
    {
        $actFilters = [];

        // Set page and pageSize, convert page to NYT format (page=0 is 1-10, page=1 is 11-20, etc.)
        $actFilters['page'] = $page - 1; // NYT pagination starts from 0
        $actFilters['api-key'] = $this->apiKey;

        // Search query 'q'
        if (!empty($filters['q'])) {
            $actFilters['q'] = $filters['q'];
        }

        // Build filter query (fq) based on the provided filters
        $filterQuery = [];

        // Filter by categories (e.g., news_desk)
        if (!empty($filters['categories'])) {
            $categories = implode('","', $filters['categories']);
            $filterQuery[] = 'news_desk:("' . $categories . '")';
        }

        // Sort by newest first
        $actFilters['sort'] = 'newest';

        // Filter by publication date range (Convert ISO date to NYTimes format YYYYMMDD)
        if (!empty($filters['dateFrom'])) {
            $actFilters['begin_date'] = date('Ymd', strtotime($filters['dateFrom'])); // Convert to YYYYMMDD
        }

        if (!empty($filters['dateTo'])) {
            $actFilters['end_date'] = date('Ymd', strtotime($filters['dateTo'])); // Convert to YYYYMMDD
        }

        // Combine the filter queries into a single 'fq' string
        if (!empty($filterQuery)) {
            $actFilters['fq'] = implode(' AND ', $filterQuery);
        }


        // Ready the response object and return it instead of the JSON, as we can use HTTP pooling
        return [
            'filters' => $actFilters,
            'url' => $this->apiUrl . '/svc/search/v2/articlesearch.json',
            'method' => 'GET',
        ];
    }


    // Function to article formater
    protected function articlesFormater($articles)
    {
        
        return array_filter(array_map(function ($article) {
            try {
                // Get the image URL from the multimedia field
                $imageUrl = '';
                if (!empty($article['multimedia'])) {
                    foreach ($article['multimedia'] as $media) {
                        if ($media['type'] === 'image') {
                            $imageUrl = 'https://www.nytimes.com/' . $media['url']; // Append the base URL
                            break;
                        }
                    }
                }
        
                return [
                    'title' => isset($article['headline']['main']) ? $article['headline']['main'] : '',
                    'description' => $article['abstract'] ?? '',
                    'author' => $article['byline']['original'] ?? '',
                    'url' => $article['web_url'],
                    'urlToImage' => $imageUrl,
                    'source' => $article['source'] ?? '',
                    'mSource' => NewsSources::getSources()[$this->serviceName],
                    'publishedAt' => $article['pub_date'],
                ];
            } catch (\Exception $e) {
                // Return null in case of an exception
                return null;
            }
        }, $articles));
        
    }


    public function getArticlesAndTotalResults(array $data): array
    {
        $articles = $data['response']['docs'] ?? [];
        $totalResults = $data['response']['meta']['hits'] ?? 0;

        return [
            'articles' => $articles,
            'totalResults' => $totalResults,
        ];
    }

}
