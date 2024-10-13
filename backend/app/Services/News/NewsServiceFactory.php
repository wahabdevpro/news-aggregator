<?php

namespace App\Services\News;

use App\Services\News\Providers\GuardianApisService;
use App\Services\News\Providers\NewsAPIService;
use App\Services\News\Providers\NyTimesAPIService;
use InvalidArgumentException;


class NewsServiceFactory
{
    /**
     * NewsServiceFactory class.
     *
     * This class is responsible for providing different news services based on the specified service name.
     *
     * @property array $services An array that maps service names to their corresponding service classes.
     */
    protected array $services = [
        'newsapi' => NewsAPIService::class,
        'nytimes' => NyTimesAPIService::class,
        'guardianapis' => GuardianApisService::class,
        
    ];

    /**
     * Creates a news service based on the provided service name.
     *
     * @param string $service The name of the news service.
     * @return BaseNewsProviderService The created news service instance.
     * @throws InvalidArgumentException If the provided service name is unknown.
     */
    public function createService(string $service): BaseNewsProviderService
    {
        if (!array_key_exists($service, $this->services)) {
            throw new InvalidArgumentException("Unknown news service: {$service}");
        }

        $serviceClass = $this->services[$service];

        return new $serviceClass();  // Create an instance of the service class
    }
}
