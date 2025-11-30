<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first(); // adjust logic (or create user)
        if (!$user) return;

        $samples = [
            ['name' => 'Groceries', 'amount' => 500, 'category' => 'Groceries', 'parent_category' => 'Living', 'goal' => 450, 'alert_threshold' => 0.8],
            ['name' => 'Fuel', 'amount' => 300, 'category' => 'Fuel', 'parent_category' => 'Transportation', 'goal' => 280, 'alert_threshold' => 0.75],
            ['name' => 'Maintenance', 'amount' => 200, 'category' => 'Maintenance', 'parent_category' => 'Transportation', 'goal' => 150, 'alert_threshold' => 0.7],
        ];

        foreach ($samples as $data) {
            Task::create(array_merge($data, ['user_id' => $user->id]));
        }
    }
}
