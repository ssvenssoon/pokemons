<?php

namespace App\Http\Controllers;

use App\Models\Move;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MoveController extends Controller
{
    public function store(Request $request)
    {
        Log::alert($request);
        $move = new Move();
        $move->name = $request->name;
        $move->power = $request->power;
        $move->save();
    }
}
