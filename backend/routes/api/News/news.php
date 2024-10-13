<?php

use App\Http\Controllers\News\NewsController;
use Illuminate\Support\Facades\Route;


Route::post('/news/search', [NewsController::class, 'getNews']);
Route::get('/news/site-data', [NewsController::class, 'getSiteData']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/news/user-newsfeed', [NewsController::class, 'getNews']);
});