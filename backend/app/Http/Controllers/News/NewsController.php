<?php

namespace App\Http\Controllers\News;

use App\Classes\ApiResponseClass;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\News\SearchWithFilterRequest;
use App\Http\Resources\News\NewsResource;
use App\Services\News\CategoryMapping;
use App\Services\News\NewsAggregator;
use App\Services\News\NewsSources;

class NewsController extends Controller
{
    protected $newsAggregator;

    public function __construct(NewsAggregator $newsAggregator)
    {
        $this->newsAggregator = $newsAggregator;
    }

    public function getSiteData()
    {

        try {

            $data = NewsSources::getSources();
            $categories = CategoryMapping::getCategories();

            $returnData = [
                'categories' => $categories,
                'sources' => $data,
            ];

            return ApiResponseClass::sendResponse($returnData, 'Site data fetched successfully');
        } catch (\Exception $e) {

            // On error, throw an exception
            return ApiResponseClass::throw($e, 'Failed to fetch the site data');
        }
    }


    public function getNews(SearchWithFilterRequest $request)
    {

        try {

            // Get the validated data array
            $filters = $request->validated();

            $userPreferences = null;

            // Check if user is logged in then get the user preferences
            if (auth()->check()) {

                $userPreferences = auth()->user()->preferences;
            }


            $data = $this->newsAggregator->getNewsWithFilters($filters, $userPreferences);


            // If all fail then return fail response
            if ($data['isAllFail']) {

                return ApiResponseClass::sendFailResponse(null, "There is problem while fetching news from all sources!");
            }

            return ApiResponseClass::sendResponse($data, 'News fetched successfully');

        } catch (\Exception $e) {

            // On error, throw an exception
            return ApiResponseClass::throw($e, 'Failed to fetch news');
        }

    
    }
}
