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
        $pivotId = $trainer->bags()->wherePivot('bags_id', $bagId)
            ->wherePivot('trainers_id', $trainerId)
            ->pluck('bags_trainers.id')
            ->first();

        if ($pivotId) {
            $trainer->bags()->wherePivot('id', $pivotId)->detach();
        } else {
            return response()->json([
                'message' => "Something went wrong!",
                'trainer' => $trainer
            ], 404);
        }

        $trainer->load('bags');


        return response()->json([
            'message' => "Bag removed from trainer.",
            'trainer' => $trainer
        ]);
    }

    public function addItemToTrainer(Request $request, $trainerId)
    {
        $trainer = Trainer::find($trainerId);
        $bagItem = $request->input('bagItem');

        $cost = $bagItem['price'];
        $trainerCoins = $trainer->coins;

        if ($trainerCoins >= $cost) {
            $trainer->coins -= $cost;
            $trainer->save();
            $trainer->bags()->attach($bagItem['id']);
            return response()->json(['message' => 'Item added successfully'], 200);
        } else {
            return response()->json(['message' => 'Insufficient coins'], 400);
        }
    }
}
