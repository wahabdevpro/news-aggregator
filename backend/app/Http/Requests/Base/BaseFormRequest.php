<?php

namespace App\Http\Requests\Base;

use App\Classes\ApiResponseClass;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class BaseFormRequest extends FormRequest
{
    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            
            ApiResponseClass::sendFailResponse($validator->errors()->first(), 'Validation errors', 200)
        );
    }

    /**
     * Default authorization (override in child classes if needed)
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true; // Can be overridden in specific requests
    }
}
