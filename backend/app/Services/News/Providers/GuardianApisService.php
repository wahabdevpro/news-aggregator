<?php

namespace App\Services\News\Providers;

use App\Services\News\CategoryMapping;
use Illuminate\Support\Facades\Http;
use App\Services\News\BaseNewsProviderService;
use App\Services\News\NewsSources;

class GuardianApisService extends BaseNewsProviderService
{
    protected $apiUrl;
    protected $apiKey;
    protected $categoryMapping;
    protected $serviceName = 'guardianapis';

    public function __construct()
    {

        // Pass service name to the parent constructor
        parent::__construct($this->serviceName);
    }


    public function getNewsWithFilters(array $filters, int $page = 1, int $pageSize = 10)
    {

        // Prepare query parameters
        $queryParams = [
            'api-key' => $this->apiKey,
            'page' => $page,
            'page-size' => $pageSize,
            'format' => 'json', // You can also request XML by changing this
        ];

        // Add filters to the query parameters
        if (!empty($filters['q'])) {
            $queryParams['q'] = $filters['q'];
        }


        // Sort by newest first
        $queryParams['order-by'] = 'newest';


        // Category filtering
        if (!empty($filters['categories'])) {
            $queryParams['section'] = $this->categoryMapping[$filters['categories'][0]] ?? null;
        }

       // From date filtering (Convert ISO to YYYY-MM-DD)
        if (!empty($filters['dateFrom'])) {
            $queryParams['from-date'] = date('Y-m-d', strtotime($filters['dateFrom']));
        }

        // To date filtering (Convert ISO to YYYY-MM-DD)
        if (!empty($filters['dateTo'])) {
            $queryParams['to-date'] = date('Y-m-d', strtotime($filters['dateTo']));
        }


        // Return the query object instead of the JSON as we may use pooling
        return [
            'filters' => $queryParams,
            'url' => $this->apiUrl . '/search',
            'method' => 'GET',
        ];
    }

    // Function to article formater
    protected function articlesFormater($articles)
    {
     
        return array_map(function ($article) {

           
                return [
                    'title' => isset($article['webTitle']) ? $article['webTitle'] : $article['title'],
                    'description' => '', // Guardian response does not provide a 'description' field
                    'author' => '', // Guardian response does not provide a 'author' field
                    'url' => isset($article['webUrl']) ? $article['webUrl'] : $article['url'],
                    'urlToImage' => '', // Guardian API does not include images in the default response
                    'source' => 'The Guardian', // Static source for Guardian
                    'mSource' => NewsSources::getSources()[$this->serviceName], // Custom source label
                    'publishedAt' => isset($article['webPublicationDate']) ? $article['webPublicationDate'] : $article['publishedAt'],
                ];
           
        }, $articles);
        
    }

    public function getArticlesAndTotalResults(array $data): array
    {
        $articles = $data['response']['results'] ?? [];
        $totalResults = $data['response']['total'] ?? 0;

        return [
            'articles' => $this->articlesFormater($articles),
            'totalResults' => $totalResults,
        ];
    }
}
