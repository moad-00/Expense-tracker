<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
     protected $guarded=[];
      public Function user(){
        return $this->belongsTo(user::class);
    }
}
