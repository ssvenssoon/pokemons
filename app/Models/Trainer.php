<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trainer extends Model
{
    use HasFactory;

    public function pokemons()
    {
        return $this->belongsToMany(Pokemon::class, 'pokemon_trainers', 'trainers_id', 'pokemon_id');
    }

    public function bags()
    {
        return $this->belongsToMany(Bag::class, 'bags_trainers', 'bags_id', 'trainers_id');
    }
}
