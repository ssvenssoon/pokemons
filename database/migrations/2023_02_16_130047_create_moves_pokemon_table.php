<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('moves_pokemon', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('moves_id')->unsigned();
            $table->unsignedBiginteger('pokemon_id')->unsigned();

            $table->foreign('moves_id')->references('id')
                ->on('moves')->onDelete('cascade');
            $table->foreign('pokemon_id')->references('id')
                ->on('pokemon')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('moves_pokemon');
    }
};
