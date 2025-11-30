<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProfileRequest;
use App\Http\Requests\StoreTsakRequest;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{

    public function index()
    {
        //
    }


   public function store(StoreProfileRequest $request)
{
    // Get validated data except user_id
    $data = $request->validated();

    // Automatically assign the authenticated user's ID
    $data['user_id'] = Auth::user()->id;

    // Create the profile with merged data
    $profile = Profile::create($data);

    return response()->json([
        'message' => 'Profile created successfully',
        'Profile' => $profile,
    ], 201);
}

    public function show(string $id)
    {
        //
    }


    public function update(Request $request, string $id)
    {
        //
    }
    public function destroy(string $id)
    {
        //
    }
}
