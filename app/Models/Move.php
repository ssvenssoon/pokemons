<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pokemon;

class Move extends Model
{
    use HasFactory;

    public function pokemons()
    {
        return $this->belongsToMany(Pokemon::class, 'moves_pokemon', 'pokemon_id', 'moves_id');
    }
}
