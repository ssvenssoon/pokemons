<?php

namespace Database\Seeders;

use App\Models\Bag;
use App\Models\Trainer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrainerBagSeeder extends Seeder
{
    public function run()
    {
        // Create a new Trainer
        $trainer = Trainer::create([
            'name' => 'Brock',
            'age' => 12,
            'profile_pic' => 'https://costumesheaven.com/ezoimgfmt/costumesheaven.b-cdn.net/wp-content/uploads/2022/08/584.jpg?ezimgfmt=rs:352x352/rscb1/ngcb1/notWebP'
        ]);

        // Create two new Bag items
        $bag1 = Bag::create([
            'name' => 'Fresh Water',
            'description' => "Restores 50 HP",
            'price' => 100,
        ]);

        $bag2 = Bag::create([
            'name' => 'Max Potion',
            'description' => "Recover 100 HP",
            'price' => 250,
        ]);

        // Associate the Bags with the Trainer
        $trainer->bags()->attach($bag1);
        $trainer->bags()->attach($bag2);
    }
}
