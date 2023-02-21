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
        Schema::create('pokemon_trainers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('pokemon_id')->unsigned();
            $table->unsignedBiginteger('trainers_id')->unsigned();

            $table->foreign('pokemon_id')->references('id')
                ->on('pokemon')->onDelete('cascade');
            $table->foreign('trainers_id')->references('id')
                ->on('trainers')->onDelete('cascade');

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
        Schema::dropIfExists('pokemon_trainers');
    }
};
