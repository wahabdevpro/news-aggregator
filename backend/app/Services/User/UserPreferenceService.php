<?php

namespace App\Services\User;

use Illuminate\Support\Facades\Auth;

class UserPreferenceService
{
    public function savePreferences(array $preferences): bool
    {
        $user = Auth::user();
        
        if ($user) {
            $user->preferences = $preferences; // No need to encode as JSON
            return $user->save();
        }
        return false;
    }

    public function getPreferences(): array
    {
        $user = Auth::user();
        if ($user && $user->preferences) {
            return $user->preferences; // Laravel automatically casts this to an array
        }

        return [
            'categories' => [],
            'authors' => [],
            'sources' => [],
        ];
    }

    public function clearPreferences(): bool
    {
        $user = Auth::user();
        if ($user) {
            $user->preferences = null; // Clear preferences
            return $user->save();
        }
        return false;
    }
}
