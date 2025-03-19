<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PartController;
use App\Http\Controllers\Api\TaxController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\BillController;
use App\Http\Controllers\AuthController;



Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout'])->name('logout');


Route::controller(PartController::class)->group(function(){
    Route::get('/parts','index')->name('parts.index');
    Route::post('/parts','store')->name('parts.store');
    Route::get('/parts/{part}','show')->name('parts.show');
    Route::put('/parts/{part}/update','update')->name('parts.update');
    Route::delete('/parts/{part}', 'destroy')->name('parts.destroy');
});

Route::controller(TaxController::class)->group(function(){
    Route::get('/taxes', 'index')->name('taxes.index');
    Route::post('/taxes', 'store')->name('taxes.store');
    Route::get('/taxes/{tax}','show')->name('taxes.show');
    Route::put('/taxes/{tax}/update', 'update')->name('taxes.update');
    Route::delete('/taxes/{tax}', 'destroy')->name('taxes.destroy');
});

Route::controller(InvoiceController::class)->group(function(){
    Route::get('/invoices', 'index')->name('invoices.index');
    Route::post('/invoices', 'store')->name('invoices.store');
    Route::get('/invoices/{invoice}', 'show')->name('invoices.show');
    // Route::put('/invoices/{invoice}/update', 'update')->name('invoices.update');
    Route::delete('/invoices/{invoice}', 'destroy')->name('invoices.destroy');
});

route::controller(BillController::class)->group(function(){
    Route::post('/bills', 'store')->name('bills.store');
});