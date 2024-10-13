<?php

if (!function_exists('returnObj')) {
    /**
     * Create a standardized returnObj structure.
     *
     * @param bool   $success  Indicates if the operation was successful.
     * @param string $message  A messageonse.
     * @param mixed  $data     The data, can be null.
     *
     * @return array
     */
    function returnObj(bool $success, string $message, $data = null): array
    {
        return [
            'success' => $success,
            'message' => $message,
            'data' => $data
        ];
    }
}