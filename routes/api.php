<?php

use App\Http\Controllers\BagController;
use App\Http\Controllers\MoveController;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\TrainerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/pokemon', [PokemonController::class, 'store']);

Route::get('/pokemon', [PokemonController::class, 'index']);

Route::get('/pokemon/{id}', [PokemonController::class, 'getSpecificPokemon']);

Route::put('/pokemon/{id}', [PokemonController::class, 'update']);

Route::put('/heal-pokemon/{id}', [PokemonController::class, 'heal']);

Route::post('/moves', [MoveController::class, 'store']);

Route::get('/trainers', [TrainerController::class, 'index']);

Route::get('/bags', [BagController::class, 'index']);
