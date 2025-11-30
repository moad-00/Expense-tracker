<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getCategoryTasks($category_id){
        $category = Category::findOrFail($category_id);
        return response()->json($category->tasks, 200);
    }
}
