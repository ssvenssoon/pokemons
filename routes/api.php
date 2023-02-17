<?php

use App\Http\Controllers\MoveController;
use App\Http\Controllers\PokemonController;
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

Route::put('/pokemon/{id}', [PokemonController::class, 'update']);

Route::post('/moves', [MoveController::class, 'store']);
