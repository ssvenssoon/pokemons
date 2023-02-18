<?php

namespace App\Http\Controllers;

use App\Models\Pokemon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PokemonController extends Controller
{
    public function index()
    {
        $pokemon = Pokemon::inRandomOrder()->limit(2)->with('moves')->get();
        return response()->json([
            'pokemon' => $pokemon
        ], 200);
    }

    public function store(Request $request)
    {
        $pokemon = new Pokemon();
        $pokemon->name = $request->name;
        $pokemon->basestats = $request->stats;
        $pokemon->level = 1;
        $pokemon->sprite_from_front = $request->sprite_from_front;
        $pokemon->sprite_from_back = $request->sprite_from_back;
        $pokemon->save();
    }
    public function update(Request $request, $id)
    {
        Pokemon::where('id', $id)
            ->update(['health' => $request->damage]);
    }
}
