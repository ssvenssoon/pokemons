<?php

namespace App\Http\Controllers;

use App\Models\Bag;
use App\Models\Trainer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BagController extends Controller
{
    public function index()
    {
        $bag = Bag::all();

        return response()->json([
            'bag' => $bag
        ], 200);
    }
    public function removeItem($bagId, $trainerId)
    {
        $trainer = Trainer::with('pokemons')->find($trainerId);
        $trainer->bags()->detach($bagId);

        $trainer->load('bags');

        return response()->json([
            'message' => "Bag removed from trainer.",
            'trainer' => $trainer
        ]);
    }
}
