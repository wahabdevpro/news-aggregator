<?php

namespace App\Classes;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class ApiResponseClass
{
    // Include default CORS headers
    protected static $corsHeaders = [
        'Access-Control-Allow-Origin' => '*', // For production use the actual domain
        'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
    ];

    public static function rollback($e, $message = "Something went wrong! Process not completed")
    {
        DB::rollBack();
        self::throw($e, $message);
    }

    public static function throw($e, $message = "Something went wrong! Process not completed")
    {
        Log::info($e);
        throw new HttpResponseException(response()->json(["message" => $message], 500)->withHeaders(self::$corsHeaders));
    }

    public static function sendResponse($result, $message = null, $code = 200)
    {
        $response = [
            'success' => true,
            'data' => $result,
        ];

        if (!empty($message)) {
            $response['message'] = $message;
        }

        return response()->json($response, $code)->withHeaders(self::$corsHeaders);
    }

    public static function sendFailResponse($data, $message = "Request failed", $code = 422)
    {
        $response = [
            'success' => false,
            'message' => $message,
            'data' => $data,
        ];

        return response()->json($response, $code)->withHeaders(self::$corsHeaders);
    }

    public static function throwFailResponse($data, $message = "Request failed", $code = 422)
    {
        $response = self::sendFailResponse($data, $message, $code);

        throw new HttpResponseException($response->withHeaders(self::$corsHeaders));
    }
}