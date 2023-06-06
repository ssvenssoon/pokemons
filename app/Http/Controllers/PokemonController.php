<?php

namespace App\Http\Controllers;

use App\Models\Move;
use App\Models\Pokemon;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
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

    public function getAllPokemons(Request $request)
    {
        $pokemons = Pokemon::paginate(10);

        return response()->json([
            'pokemons' => $pokemons
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

            $client = new Client();

            foreach ($moves as $move) {
                $moveName = $move['move']['name'];
                $moveUrl = $move['move']['url'];

                $moveApiResponse = Cache::get($moveUrl);

                if (!$moveApiResponse) {
                    $response = $client->get($moveUrl);
                    $moveApiResponse = $response->getBody()->getContents();

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

    public function heal(Request $request, $id)
    {
        $value = $request->input('bagDescription');
        preg_match('/(\d+)/', $value, $matches);
        $hpRecovered = intval($matches[0]);

        $pokemon = Pokemon::with('moves')->findOrFail($id);
        $newHealth = $pokemon->health + $hpRecovered;

        if ($newHealth > 100) {
            $pokemon->health = 100;
        } else {
            $pokemon->health = $newHealth;
        }

        $pokemon->save();

        return response()->json([
            'message' => "Pokemon's health updated successfully.",
            'data' => $pokemon
        ]);
    }

    public function addPokemonToTrainer($pokemonId, $trainerId)
    {
        $pokemon = Pokemon::find($pokemonId);
        $pokemon->trainers()->attach($trainerId);

        return response()->json([
            'message' => 'Pokemon added to trainer successfully',
        ], 200);
    }
}
