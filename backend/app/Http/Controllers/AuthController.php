<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle user login and return an API token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
       try{
         // Validate the incoming request data
         $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Attempt to authenticate the user
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            // Generate a new Sanctum token
            $token = $user->createToken('auth_token')->plainTextToken;

            // Return the token and user data
            return response()->json([
                'token' => $token,
                'user' => $user,
            ], 200);
        }else{
            \Log::error('Error while login the user: Invalid credentials');
            return response()->json([
                'error' => 'Informations incorrectes',
            ]);
        }
       }catch(\Exception $e){
            \Log::error('Error while login the user: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage(),
            ], 401);
       }
    }

    /**
     * Log the user out by revoking the current token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Revoke the current token
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie!',
        ], 200);
    }
}