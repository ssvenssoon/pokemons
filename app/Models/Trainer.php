<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trainer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'age',
        'profile_pic',
        'coins'
    ];

    public function pokemons()
    {
        return $this->belongsToMany(Pokemon::class, 'pokemon_trainers', 'trainers_id', 'pokemon_id');
    }

    public function bags()
    {
        return $this->belongsToMany(Bag::class, 'bags_trainers', 'trainers_id', 'bags_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeCurrentUser($query)
    {
        return $query->where('user_id', auth()->id());
    }
}
