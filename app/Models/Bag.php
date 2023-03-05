<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bag extends Model
{
    use HasFactory;

    public function trainers()
    {
        return $this->belongsToMany(Trainer::class, 'bags_trainers', 'bags_id', 'trainers_id');
    }
}
