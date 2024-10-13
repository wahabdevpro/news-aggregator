<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register']);  // Register a new user
Route::post('/auth/login', [AuthController::class, 'login']);        // Login and get a token


// Routes that require authentication
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);  // Logout and revoke the token
    Route::get('/auth/user', [AuthController::class, 'userProfile']); // Get authenticated user's details
});


?>