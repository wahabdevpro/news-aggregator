<?php

namespace App\Http\Controllers\User;

use App\Classes\ApiResponseClass;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\SavePreferencesRequest;
use App\Services\News\CategoryMapping;
use App\Services\News\NewsSources;
use App\Services\User\UserPreferenceService;


class UserPreferenceController extends Controller
{
    protected $userPreferenceService;

    public function __construct(UserPreferenceService $userPreferenceService)
    {
        $this->userPreferenceService = $userPreferenceService;
    }

    
    /**
     * Saves user preferences.
     *
     * @param Request $request The HTTP request object.
     * @return ApiResponseClass The API response.
     */
    public function savePreferences(SavePreferencesRequest $request)
    {
        // Get the validated data array
        $preferences = $request->validated();

        // If failed to save preferences, return an error response
        if (!$this->userPreferenceService->savePreferences($preferences)) {
            return ApiResponseClass::sendFailResponse(null, 'Failed to save preferences');
        }

        // Success
        return ApiResponseClass::sendResponse('Preferences saved successfully');
    }

    
    /**
     * Retrieves the server data and the user preference.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPreferences()
    {

        // Get the site categories
        $categories = CategoryMapping::getCategories();

        // Get the sources
        $sources = NewsSources::getSources();

        // Get the user preferences
        $userPreferences = $this->userPreferenceService->getPreferences();

        // Prepare the data to be returned
        $data = [
            'categories' => $categories,
            'sources' => $sources,
            'userPreferences' => $userPreferences,
        ];
        

       return ApiResponseClass::sendResponse($data, 'Preferences retrieved successfully');
    }

  
    /**
     * Clears the user preferences.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function clearPreferences()
    {

        // if failed
        if (!$this->userPreferenceService->clearPreferences()) {
            return ApiResponseClass::sendFailResponse(null, 'Failed to clear preferences');
        }

        // Success
        return ApiResponseClass::sendResponse(null, 'Preferences cleared successfully');
    }
}
