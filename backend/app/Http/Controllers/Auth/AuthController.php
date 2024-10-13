<?php

namespace App\Http\Controllers\Auth;

use App\Classes\ApiResponseClass;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\Auth\UserResource;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\Auth\AuthService;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Register a new user
     */
    public function register(RegisterRequest $request)
    {

        try {

            // Get the validated data array
            $validatedData = $request->validated();

            // Call the register service method
            $stat = $this->authService->register($validatedData);

            // If not success
            if (!$stat['success']) {

                // Return a fail response
                return ApiResponseClass::sendFailResponse($stat['message'], null, 200);
            }

            $data = $stat['data'];

            // Return a combined response with user data and token
            return ApiResponseClass::sendResponse([
                'user' => new UserResource($data['user']),  // Format user data
                'token' => $data['token'],  // Include token in the response
            ], 'User registered successfully');
            
        } catch (\Exception $e) {

            // On error, throw an exception
            return ApiResponseClass::throw($e, 'User registration failed');
        }
    }

    /**
     * Login a user
     */
    public function login(LoginRequest $request)
    {

        // Get the validated data array
        $validatedData = $request->validated();

        // Call the login service method
        $stat = $this->authService->login($validatedData);

        // If not success
        if (!$stat['success']) {

            // Return a fail response
            return ApiResponseClass::sendFailResponse($stat['message'], null, 200);
        }

        $data = $stat['data'];

        // Return a combined response with user data and token
        return ApiResponseClass::sendResponse([
            'user' => new UserResource($data['user']),
            'token' => $data['token'],
        ], 'Login successful');
    }


    /**
     * Logout a user
     */
    public function logout()
    {
        // Call the logout service method
        return $this->authService->logout();
    }
}
