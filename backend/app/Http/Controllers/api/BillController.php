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
                'invoiceId' => 'required|exists:invoices,id',
                'parts' => 'required|array',
                'parts.*.partId' => 'required|exists:parts,id',
                'parts.*.quantity' => 'required|numeric|min:1',
            ],[
                'invoiceId.required' => 'L\'ID de la facture est requis.',
                'invoiceId.exists' => 'Cette facture n\'existe pas.',
                'parts.required' => 'Les pièces sont requises.',
                'parts.array' => 'Les pièces doivent être un tableau.',
                'parts.*.partId.required' => 'L\'ID de la pièce est requis.',
                'parts.*.partId.exists' => 'Cette pièce n\'existe pas.',
                'parts.*.quantity.required' => 'La quantité est requise.',
                'parts.*.quantity.numeric' => 'La quantité doit être un nombre.',
                'parts.*.quantity.min' => 'La quantité doit être au moins 1.',
            ]);

            $invoiceId = $request->invoiceId;
            $parts = $request->parts;
            $data = [];
            foreach($parts as $part){
                array_push($data, [
                    'invoiceId' => $invoiceId,
                    'partId' => $part['partId'],
                    'quantity' => $part['quantity']
                ]);
            }
            \log::info('Data array', $data);
            Bill::insert($data);

            return response()->json([
                'message' => 'Facture EG crée avec succés'
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
