<?php

use App\Http\Controllers\User\UserPreferenceController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/preferences', [UserPreferenceController::class, 'savePreferences']);
    Route::get('/user/preferences', [UserPreferenceController::class, 'getPreferences']);
    Route::delete('/user/preferences', [UserPreferenceController::class, 'clearPreferences']);
});
