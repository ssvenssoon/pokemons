<?php

namespace App\Http\Controllers;

use App\Models\Trainers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TrainerController extends Controller
{
    public function index()
    {
        $trainers = Trainers::with('pokemons.moves')->get();
        return response()->json([
            'trainers' => $trainers
        ], 200);
    }
}
