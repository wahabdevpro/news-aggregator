<?php

namespace App\Services\News\Providers;

use App\Services\News\CategoryMapping;
use Illuminate\Support\Facades\Http;
use App\Services\News\BaseNewsProviderService;
use App\Services\News\NewsSources;

class NewsAPIService extends BaseNewsProviderService
{
    protected $apiUrl;
    protected $apiKey;
    protected $categoryMapping;
    protected $serviceName = 'newsapi';

    public function __construct()
    {
        // Pass service name to the parent constructor
        parent::__construct($this->serviceName);

    }


    public function getSiteData() {

        return [
            'categories' => CategoryMapping::getCategories(),
            'sources' => NewsSources::getSources(),
        ];

    }


    public function getNewsWithFilters(array $filters, int $page = 1, int $pageSize = 10)
    {

        $actFilters = [];
        $actFilters['page'] = $page;
        $actFilters['pageSize'] = $pageSize;
        $actFilters['apiKey'] = $this->apiKey;
        $actFilters['country'] = 'us'; // Default to US news

        // if q is provided then add it to the filters
        if (!empty($filters['q'])) {
            $actFilters['q'] = $filters['q'];
        }

        // Sort by newest first
        $actFilters['sortBy'] = 'publishedAt';
        
        // if category is provided, map it to the service specific category. The api only accepts one category
        if (!empty($filters['categories'])) {
            $actFilters['category'] = $this->categoryMapping[$filters['categories'][0]] ?? null;
        }

        // Add date range filters if provided (for the Everything endpoint)
        if (!empty($filters['dateFrom'])) {
            $actFilters['from'] = date('Y-m-d', strtotime($filters['dateFrom'])); // Convert ISO to Y-m-d format
        }
        if (!empty($filters['dateTo'])) {
            $actFilters['to'] = date('Y-m-d', strtotime($filters['dateTo'])); // Convert ISO to Y-m-d format
        }

        // Ready the response object and return it instead of the json as we can use http pooling
        return [
            'filters' => $actFilters,
            'url' => $this->apiUrl . '/everything',
            'method' => 'GET',
        ];

    }

    // Function to article formater
    protected function articlesFormater($articles)
    {
        return array_filter(array_map(function ($article) {
            try {
                return [
                    'title' => $article['title'],
                    'description' => $article['content'] ?? $article['description'] ?? '',
                    'author' => $article['author'] ?? '',
                    'url' => $article['url'],
                    'urlToImage' => $article['urlToImage'],
                    'source' => $article['source']['name'] ?? '',
                    'mSource' => NewsSources::getSourceName($this->serviceName), // Custom source label
                    'publishedAt' => $article['publishedAt'],
                ];
            } catch (\Exception $e) {
                // Return null in case of an exception
                return null;
            }
        }, $articles));
        
    }

    public function getArticlesAndTotalResults(array $data): array
    {
        $articles = $data['articles'] ?? [];
        $totalResults = $data['totalResults'] ?? 0;

        return [
            'articles' => $articles,
            'totalResults' => $totalResults,
        ];
    }

  
}