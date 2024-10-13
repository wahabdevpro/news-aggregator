<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Base\BaseFormRequest;

class RegisterRequest extends BaseFormRequest
{
    /**
     * Define the validation rules for registration.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ];
    }
}
