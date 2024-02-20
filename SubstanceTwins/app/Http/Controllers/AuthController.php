<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Bridge\AccessToken;
use Laravel\Passport\Passport;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        //validate data
        $data = $request->validated();

        //create user
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),

        ]);

        //create token
        $accessToken = $user->createToken('authToken')->accessToken;

        //return respose
        return ([
            'user' => $user,
            'accessToken' => $accessToken
        ]);

    }
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        if (!Auth::attempt($data)) {
            return response([
                'errors' => ['Email or password was incorrect']
            ], 422);
        } else {
            $user = User::find(Auth::user()->id);

            $accessToken = $user->createToken('appToken')->accessToken;

            return ([
                'user' => $user,
                'accessToken' => $accessToken
            ]);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

}