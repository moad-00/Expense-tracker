<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExpenseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public auth endpoints
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [UserController::class, 'logout']);
    Route::get('user', fn(Request $request) => $request->user());

    // Tasks (budgets)
    // Add 'update' to the allowed actions. This registers PUT/PATCH /api/tasks/{task}
    Route::apiResource('tasks', TaskController::class)->only(['index', 'store', 'update', 'destroy']);

    // Expenses
    Route::get('expenses', [ExpenseController::class, 'index']);
    Route::post('expenses', [ExpenseController::class, 'store']);
    Route::delete('expenses/{id}', [ExpenseController::class, 'destroy']);
});
