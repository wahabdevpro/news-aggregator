<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{

    public function register(array $data)
    {
        // Create the user with the provided data
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // Generate the API token
        $token = $user->createToken('API Token')->plainTextToken;

        // Return the user and token
        return ['user' => $user, 'token' => $token];
    }

    public function login(array $credentials)
    {
        // Attempt login with the provided credentials
        if (!Auth::attempt($credentials)) {
            return returnObj(false, 'Invalid credentials');
        }

        // If successful, return the user's API token
        $user = Auth::user();

        // Generate the API token
        $token = $user->createToken('API Token')->plainTextToken;

        // Return the user and token
        return returnObj(true, 'Login successful', ['user' => $user, 'token' => $token]);
    }

    public function logout()
    {
        // Revoke all tokens for the authenticated user
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
