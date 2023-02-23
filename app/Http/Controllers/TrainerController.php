<?php

namespace App\Http\Controllers;

use App\Models\Trainer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TrainerController extends Controller
{
    public function index()
    {
        $trainers = Trainer::with(['pokemons.moves', 'bags'])->get();

        return response()->json([
            'trainers' => $trainers
        ], 200);
    }
}
