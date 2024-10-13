<?php

namespace App\Services\News;

class CategoryMapping
{
    public static function getMapping(): array
    {
        return [

            // Site Main categories
            'categories' => [
                'business' => 'Business',
                'entertainment' => 'Entertainment',
                'general' => 'General',
                'health' => 'Health',
                'science' => 'Science',
                'sports' => 'Sports',
                'technology' => 'Technology'
            ],

            // Newsapi maping
            'newsapi' => [
                'business' => 'business',
                'entertainment' => 'entertainment',
                'general' => 'general',
                'health' => 'health',
                'science' => 'science',
                'sports' => 'Sports',
                'technology' => 'technology',
            ],
            
            'guardianapis' => [
                'business' => 'business',                   // Business -> Business
                'entertainment' => 'culture',               // Entertainment -> Culture
                'general' => 'news',                        // General -> News
                'health' => 'society/health',               // Health -> Health (under Society)
                'science' => 'science',                     // Science -> Science
                'sports' => 'sport',                        // Sports -> Sport
                'technology' => 'technology'                // Technology -> Technology
            ],


            'nytimes' => [
                'business' => 'Business',                   // Matches 'Business' in NYT
                'entertainment' => 'Culture',               // Closest match is 'Culture' or 'Arts'
                'general' => 'General News',                // Closest option could be 'General News'
                'health' => 'Health',                       // Matches 'Health' in NYT
                'science' => 'Science',                     // Matches 'Science' in NYT
                'sports' => 'Sports',                       // Matches 'Sports' in NYT
                'technology' => 'Technology',               // Matches 'Technology' in NYT
            ],
            
        ];
    }

    public static function getMappingForService(string $service): ?array
    {
        $mapping = self::getMapping();
        return $mapping[$service] ?? null;
    }

    
    public static function getCategories(): array
    {
        return self::getMapping()['categories'];
    }
}
