<?php

namespace App\Services\News;

abstract class BaseNewsProviderService
{

    protected $apiUrl;
    protected $apiKey;
    protected $categoryMapping;

     // Abstract method that must be implemented by each news service provider
     abstract public function getNewsWithFilters(array $filters, int $page = 1, int $pageSize = 10);

     // Abstract method for retrieving articles and total results
     abstract public function getArticlesAndTotalResults(array $data): array;

     // Abstract method for the articlesFormater
    abstract protected function articlesFormater(array $articles);


    public function __construct(string $serviceName)
    {

        // Dynamically set API URL and key based on the service name
        $this->apiUrl = config("services.{$serviceName}.url");
        $this->apiKey = config("services.{$serviceName}.key");

        // Set category mapping for the specific service
        $this->categoryMapping = CategoryMapping::getMappingForService($serviceName);

    }


    // Common response formatter logic for all providers
    public function responseFormatter($response): array
    {
        if ($response->successful()) {

            $data  = $response->json() ?? [];

            $articlesData = $this->getArticlesAndTotalResults($data);
          
            return [
                'success' => true,
                'data' => $this->articlesFormater($articlesData["articles"]),
                'totalResults' => $articlesData["totalResults"],
                'errorDetails' => null,
            ];
        }

        return [
            'success' => false,
            'data' => null,
            'errorDetails' => [
                'message' => 'Failed to fetch news',
                'statusCode' => $response->status(),
                'body' => $response->body(),
            ],
        ];
    }

}
