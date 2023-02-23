<?php

namespace App\Http\Controllers;

use App\Models\Move;
use App\Models\Pokemon;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;
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

    public function getSpecificPokemon($id)
    {
        $pokemon = Pokemon::with('moves')->find($id);

        if ($pokemon) {
            return response()->json($pokemon);
        } else {
            return response()->json(['error' => 'Pokemon not found'], 404);
        }
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
            return;
        } else {
            $newPokemon = new Pokemon();
            $newPokemon->name = $pokemon;
            $newPokemon->sprite_from_front = $sprite_from_front;
            $newPokemon->sprite_from_back = $sprite_from_back;
            $newPokemon->basestats = $stats;
            $newPokemon->level = 1;
            $newPokemon->health = 100;

            $newPokemon->save();

            // Create new Guzzle client instance
            $client = new Client();


            foreach ($moves as $move) {
                $moveName = $move['move']['name'];
                $moveUrl = $move['move']['url'];

                // Check if move data is already cached
                $moveApiResponse = Cache::get($moveUrl);

                if (!$moveApiResponse) {
                    $response = $client->get($moveUrl);
                    $moveApiResponse = $response->getBody()->getContents();

                    // Cache move data for future requests
                    Cache::put($moveUrl, $moveApiResponse, now()->addHours(24));
                }

                $decodedApiResponse = json_decode($moveApiResponse, true);

                $existingMove = Move::where('name', $moveName)->first();

                if ($existingMove) {
                    $newMove = $existingMove;
                } else {
                    $newMove = new Move();
                    $newMove->name = $moveName;
                    $newMove->power = $decodedApiResponse['power'] ?? 40;

                    $newMove->save();
                }
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
