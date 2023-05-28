<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class TrainerController extends Controller
{
    public function index()
    {
        $trainers = auth()->user()->trainers()->with(['pokemons.moves', 'bags'])->get();

        return response()->json([
            'trainers' => $trainers
        ], 200);
    }

    public function getTrainer($id)
    {
        $trainer = auth()->user()->trainers()->with(['pokemons.moves', 'bags'])->find($id);

        if (!$trainer) {
            return response()->json(['message' => 'Trainer not found'], 404);
        }

        return response()->json([
            'trainer' => $trainer
        ], 200);
    }

    public function updateCoins(Request $request, $id)
    {
        $trainer = auth()->user()->trainers()->with(['pokemons.moves', 'bags'])->findOrFail($id);

        $newCoins = $request->input('newCoins');

        $trainer->increment('coins', $newCoins);

        return response()->json(['message' => 'Coins updated successfully', 'trainer' => $trainer], 200);
    }

    public function createTrainer(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'name' => 'required|string',
            'age' => 'required|integer',
            'image' => 'required|image',
        ]);

        $imagePath = $validatedData['image']->store('public/images');
        $imageUrl = Storage::url($imagePath);

        $trainer = $user->trainers()->create([
            'name' => $validatedData['name'],
            'age' => $validatedData['age'],
            'profile_pic' => $imageUrl,
            'coins' => 0
        ]);

        return response()->json(['message' => 'Trainer created successfully', 'trainer' => $trainer], 201);
    }
}
