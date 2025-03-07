<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PartController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(PartController::class)->group(function(){
    Route::get('/parts','index')->name('parts.index');
    Route::post('/parts','store')->name('parts.store');
    Route::put('/parts/{part}/update','update')->name('parts.update');
    Route::delete('/parts/{part}', 'destroy')->name('parts.destroy');
});
