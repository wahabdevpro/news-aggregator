<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\News\NewsServiceFactory;
use Illuminate\Support\Facades\Http;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind NewsServiceFactory as a singleton (to share the same instance)
        $this->app->singleton(NewsServiceFactory::class, function ($app) {
            return new NewsServiceFactory();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        // For development disable the ssl verification for each outgoing request
        Http::globalOptions([
            'verify' => false,
        ]);
    }
}
