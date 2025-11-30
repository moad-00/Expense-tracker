<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTsakRequest; // Your existing request (typo preserved if that's the actual file name)
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Get all budgets (tasks) for the logged-in user
    public function index()
    {
        return Auth::user()->tasks;
    }

    // Create a new budget
    public function store(StoreTsakRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();

        $task = Task::create($validated);

        return response()->json($task, 201);
    }

    // Update an existing budget
    // Accepts PATCH or PUT /api/tasks/{task}
    public function update(StoreTsakRequest $request, Task $task)
    {
        // Ensure the authenticated user owns this task
        if ($task->user_id !== Auth::id()) {
            return response()->json(['message' => 'You do not own this task.'], 403);
        }

        $validated = $request->validated();

        // Update allowed fields
        $task->name   = $validated['name'];
        $task->amount = $validated['amount'];
        $task->save();

        return response()->json([
            'message' => 'Budget updated successfully.',
            'task'    => $task,
        ], 200);
    }

    // Delete a budget
    public function destroy($id)
    {
        $task = Task::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$task) {
            return response()->json(['message' => 'Task not found or you do not own this task.'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully.']);
    }
}
