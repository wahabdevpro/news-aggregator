<?php

namespace App\Http\Requests\User;

use App\Http\Requests\Base\BaseFormRequest;
use App\Services\News\CategoryMapping;
use App\Services\News\NewsSources;

class SavePreferencesRequest extends BaseFormRequest
{


    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        // If it have the authors key, convert all authors to lowercase
        if ($this->has('authors')) {
            $this->merge([
                'authors' => array_map('strtolower', $this->authors),  // Convert all authors to lowercase
            ]);
        }
    }


    /**
     * Define the validation rules for login.
     *
     * @return array
     */
    public function rules(): array
    {

        // Get the categories array key which is allowed
        $validCategoriesKeys = array_keys(CategoryMapping::getCategories());

        // Get the sources array key which is allowed
        $validSourcesKeys = NewsSources::getSourcesKeys();

        return [
            'categories' => 'nullable|array',
            'categories.*' => 'string|in:' . implode(',', $validCategoriesKeys), // Ensure each category is a valid key
            'authors' => 'nullable|array',
            'authors.*' => 'string',  // Ensure each author is a string
            'sources' => 'nullable|array',  // Ensure each source is a string
            'sources.*' => 'string|in:' . implode(',', $validSourcesKeys), // Ensure each source is a valid key
        ];
    }


    /**
     * Custom error messages for validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'categories.*.in' => 'One or more categories are invalid. Please select valid categories.',
            'authors.*.string' => 'Each author must be a valid string.',
            'sources.*.in' => 'One or more sources are invalid. Please select valid sources.',
        ];
    }
}
