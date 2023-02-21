<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{
    use HasFactory;

    public function moves()
    {
        return $this->belongsToMany(Move::class, 'moves_pokemon', 'pokemon_id', 'moves_id');
    }

    public function trainers()
    {
        return $this->belongsToMany(Trainer::class, 'pokemon_trainers', 'pokemon_id', 'trainers_id');
    }
}
