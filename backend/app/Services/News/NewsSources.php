<?php

namespace App\Services\News;

class NewsSources
{
    /**
     * Returns an array of available news sources.
     *
     * @return array The array of news sources, where the keys are the source codes and the values are the source names.
     */
    public static function getSources(): array
    {

        return [
            'nytimes' => 'The New York Times',
            'newsapi' => 'News Api',
            'guardianapis' => 'Guardians Api',
        ];
        
    }

   
    /**
     * Returns an array of keys for the news sources.
     *
     * @return array The array of keys for the news sources.
     */
    public static function getSourcesKeys(): array
    {
        return array_keys(self::getSources());
    }


    public static function getSourceName(string $source): string
    {
        $sources = self::getSources();
        return $sources[$source];
    }

   
}
