<?php

namespace App\Http\Requests\News;

use App\Http\Requests\Base\BaseFormRequest;
use App\Services\News\CategoryMapping;
use App\Services\News\NewsSources;

class SearchWithFilterRequest extends BaseFormRequest
{


    /**
     * Define the validation rules for search with filters.
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
            'q' => 'nullable|string', // Search query
            'categories' => 'nullable|array',
            'categories.*' => 'string|in:' . implode(',', $validCategoriesKeys), // Ensure each category is a valid key
            'sources' => 'nullable|array',  // Ensure each source is a string
            'sources.*' => 'string|in:' . implode(',', $validSourcesKeys), // Ensure each source is a valid key
            'page' => 'nullable|integer|min:1', // Page number
            'pageSize' => 'nullable|integer|min:1|max:100', // Page size limits (1 to 100)
            // sourceData is needed for pagination
            'sourceData' => 'sometimes|array', // Basic validation to ensure sourceData is an array if present
            'sourceData.*' => 'integer', // Ensures each sourceData entry is an integer
            'dateFrom' => 'nullable|string',
            'dateTo' => 'nullable|string',

        ];
    }

    /**
     * Prepare the request for validation.
     *
     * This method is called before the request is validated. It sets default values for some parameters if they are not provided in the request.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        // Set default values for page and pageSize if not provided
        $this->merge([
            'page' => $this->input('page', 1), // Default page to 1
            'pageSize' => $this->input('pageSize', 10), // Default pageSize to 10
            'q' => $this->input('q') ? strtolower($this->input('q')) : null,
        ]);
    }


    public function withValidator($validator)
    {

        // Validate the session param
        $this->validateSourceDataParam($validator);
    }



    /**
     * Handle any custom messages for validation.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'categories.array' => 'The categories must be an array.',
            'categories.*.in' => 'The selected category :input is invalid. Valid categories are: ' . implode(', ', array_keys(CategoryMapping::getCategories())),
            'sources.array' => 'The sources must be an array.',
            'sources.*.in' => 'The selected source :input is invalid. Valid sources are: ' . implode(', ', NewsSources::getSourcesKeys()),
            'page.integer' => 'The page number must be an integer.',
            'page.min' => 'The page number must be at least 1.',
            'pageSize.integer' => 'The page size must be an integer.',
            'pageSize.min' => 'The page size must be at least 1.',
            'pageSize.max' => 'The page size may not be greater than 100.',
            'date.date_format' => 'The date must be in the format YYYY-MM-DD.',
        ];
    }


    private function validateSourceDataParam($validator) {

        $validator->after(function ($validator) {

            // Convert the page to an integer
            $page = (int)request()->get('page', 1);

            // Only validate sourceData if the page is greater than 1
            if ($page > 1) {

                $data = request()->all();

                // Ensure sourceData exists and is an array
                if (!isset($data['sourceData']) || !is_array($data['sourceData'])) {
                    $validator->errors()->add('sourceData', 'The sourceData field is required and must be an array when the page number is greater than 1.');
                    return;
                }

                $validSourcesKeys = NewsSources::getSourcesKeys(); // Retrieve valid sources

                foreach ($data['sourceData'] as $key => $val) {
                    
                    // Check if the key is a valid source
                    if (!in_array($key, $validSourcesKeys)) {
                        $validator->errors()->add("sourceData.$key", "The sourceData key '$key' is no invalid news source.");
                    }

                    // Check if the value is an integer
                    if (!is_int((int)$val)) {
                        $validator->errors()->add("sourceData.$key", "The sourceData value for '$key' must be an integer.");
                    }
                }
            }
        });

    }
}
