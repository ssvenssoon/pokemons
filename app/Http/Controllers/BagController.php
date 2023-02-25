<?php

namespace App\Http\Controllers;

use App\Models\Bag;

class BagController extends Controller
{
    public function index()
    {
        $bag = Bag::all();

        return response()->json([
            'bag' => $bag
        ], 200);
    }
}
