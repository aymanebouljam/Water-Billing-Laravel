<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use Illuminate\Http\Request;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $request->validate([
                'invoiceId' => 'required|numeric',
                'partId' => 'required|numeric',
                'quantity' => 'required|numeric',
            ],[
                'invoiceId.required' => 'Veuillez remplir le formulaire avant de choisir les pièces',
                'invoiceId.numeric' => 'Le numéro de facture doit être numérique',
                'partId.required' => 'Veuillez choisir au minimum une pièce',
                'partId.numeric' => 'le code de pièce doit être numérique',
                'quantity.required' => 'Veuillez indiquer la quantité',
                'quantity.numeric' => 'La quantité doit être numérique'
            ]);

            $bill = Bill::create([
                'invoiceId' => $request->invoiceId,
                'partId' => $request->partId,
                'quantity' => $request->quantity
            ]);

        }catch(\Exception $e){
            \Log::error('Error while storing Bill '. $e->getMessage());
            return response()->json(['message' => 'Erreur survenue lors d\'exécution de l\'opération demandée']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Bill $bill)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bill $bill)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bill $bill)
    {
        //
    }
}
