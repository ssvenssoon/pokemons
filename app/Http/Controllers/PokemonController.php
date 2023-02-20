<?php

namespace App\Http\Controllers;

use App\Models\Move;
use App\Models\Pokemon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

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
        $moves = $request->moves;
        $pokemon = $request->name;
        $sprite_from_front = $request->sprite_from_front;
        $sprite_from_back = $request->sprite_from_back;
        $stats = $request->stats;


        $doesPokemonExist = Pokemon::where('name', $pokemon)->first();

        if ($doesPokemonExist) {
            // The pokemon exists, return the script
            return;
        } else {
            // If not:
            // create new Pokemon instance
            $newPokemon = new Pokemon();
            $newPokemon->name = $pokemon;
            $newPokemon->sprite_from_front = $sprite_from_front;
            $newPokemon->sprite_from_back = $sprite_from_back;
            $newPokemon->basestats = $stats;
            $newPokemon->level = 1;
            $newPokemon->health = 100;
            // dd($newPokemon);

            // save new Pokemon instance to database
            $newPokemon->save();

            // add moves to Pokemon instance
            foreach ($moves as $move) {
                $moveName = $move['move']['name'];
                $moveUrl = $move['move']['url'];

                // check if move data is already cached
                $moveApiResponse = Cache::get($moveUrl);

                if (!$moveApiResponse) {
                    // fetch move data
                    $moveApiResponse = file_get_contents($moveUrl);

                    // cache move data for future requests
                    Cache::put($moveUrl, $moveApiResponse, now()->addHours(24));
                }

                $decodedApiResponse = json_decode($moveApiResponse);

                $existingMove = Move::where('name', $moveName)->first();

                if ($existingMove) {
                    // Move already exists in the database
                    $newMove = $existingMove;
                } else {
                    // create new Move instance
                    $newMove = new Move();
                    $newMove->name = $moveName;
                    $newMove->power = $decodedApiResponse->power ?? 40;

                    // save new Move instance to database
                    $newMove->save();
                }
                // add Move instance to Pokemon instance
                $newPokemon->moves()->attach($newMove->id);
            }
        }
    }

    public function update(Request $request, $id)
    {
        Pokemon::where('id', $id)
            ->update(['health' => $request->damage]);
    }
}
