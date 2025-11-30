<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable=['name','description','amount','user_id'];
       public Function user(){
        return $this->belongsTo(user::class);
    }
       public Function categories(){
        return $this->belongsToMany(Category::class,'category_task');
    }
    protected $casts = [
    'amount' => 'integer',
    ];


}
