<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'task_id',
        'name',
        'amount',
    ];

    /**
     * Define the relationship to the Task model.
     */
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
