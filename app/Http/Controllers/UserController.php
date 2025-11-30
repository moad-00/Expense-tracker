<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|unique:users,email',
            'password'=>'required|string|min:8|confirmed'
        ]);

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);

        return response()->json(['message'=>'You registered successfully','user'=>$user],201);
    }

    public function login(Request $request){
        $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|string'
        ]);

        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['message'=>'Invalid email or password'],401);
        }

        $user = User::where('email',$request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message'=>'Login successfully','user'=>$user,'token'=>$token],200);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message'=>'Logout success']);
    }

    public function showProfile(int $id){
        $user = User::find($id);
        if(!$user){
            return response()->json(['message'=>'User not found'],404);
        }
        return response()->json($user->profile,200);
    }

    public function getUserTasks(int $id){
        $user = User::find($id);
        if(!$user){
            return response()->json(['message'=>'User not found'],404);
        }
        return response()->json($user->tasks,200);
    }
}
