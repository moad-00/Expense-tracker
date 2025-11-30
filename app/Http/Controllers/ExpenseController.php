<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    // Return all expenses for the authenticated user, with the related task (budget)
    public function index()
    {
        $expenses = Expense::where('user_id', Auth::id())
            ->with('task')
            ->latest()
            ->get();

        return response()->json($expenses);
    }

    // Create a new expense
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'budgetId' => 'required|exists:tasks,id'
        ]);

        $expense = Expense::create([
            'user_id' => Auth::id(),
            'task_id' => $validatedData['budgetId'],
            'name' => $validatedData['name'],
            'amount' => $validatedData['amount'],
        ]);

        // Return expense with related task so UI can render immediately if needed
        $expense->load('task');

        return response()->json($expense, 201);
    }

    // Delete an expense owned by the user
    public function destroy($id)
    {
        $expense = Expense::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        $expense->delete();

        return response()->json(['message' => 'Expense deleted']);
    }
}
