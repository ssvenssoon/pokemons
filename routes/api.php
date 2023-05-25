<?php

use App\Http\Controllers\Api\AuthController;
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

// Login
Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);

Route::group(['middleware' => 'auth:sanctum'], function () {

    // Pokemon
    Route::post('/pokemon', [PokemonController::class, 'store']);
    Route::get('/pokemon', [PokemonController::class, 'index']);
    Route::get('/pokemon/{id}', [PokemonController::class, 'getSpecificPokemon']);
    Route::put('/pokemon/{id}', [PokemonController::class, 'update']);
    Route::put('/heal-pokemon/{id}', [PokemonController::class, 'heal']);

    // Moves
    Route::post('/moves', [MoveController::class, 'store']);

    // Trainers
    Route::get('/trainers', [TrainerController::class, 'index']);
    Route::put('/trainers/{id}', [TrainerController::class, 'updateCoins']);
    Route::get('/get-trainer/{id}', [TrainerController::class, 'getTrainer']);

    // Bags
    Route::get('/bags', [BagController::class, 'index']);
    Route::delete('/remove-bag/{bagId}/trainer/{trainerId}', [BagController::class, 'removeItem']);
    Route::post('/add-bag/trainer/{trainerId}', [BagController::class, 'addItemToTrainer']);
});
