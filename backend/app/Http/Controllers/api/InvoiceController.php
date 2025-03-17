<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $invoices = Invoice::all();
            if(!$invoices){
                return response()->json([
                    'message' => 'Aucune facture trouvée'
                ]);
            }
            return response()->json([
                'data' => $invoices,
            ]);
        }catch(\Exception $e){
            \Log::error('Error while fetching Invoices '. $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de récupération des factures',
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $request->validate([
                'subject' => 'required',
                'type' => 'required',
                'client' => "required|regex:/^[\p{L}\s'-]+$/u",
                'contract' => 'numeric',
                'counter' => 'required|numeric',
                'total' => 'numeric',
            ],[
                'subject.required' => 'Veuillez saisir l\'objet de la facture',
                'type.required' => 'Veuillez saisir le type d\'opération',
                'client.required' => 'Veuillez saisir le nom du client',
                'client.regex' => 'Le nom du client doit être alphabétique',
                'contract.numeric' => 'Le numéro de contract doit être numérique',
                'counter.required' => 'Veuillez indiquer le nombre des compteurs',
                'counter.numeric' => 'Le nombre de compteurs doit être numérique',
                'total.numeric' => 'Le total doit être numérique',
            ]);
    
            $invoice = Invoice::create([
                'subject' => $request->subject,
                'type' => $request->type,
                'client' => $request->client,
                'contract' => $request->contract ?? null,
                'counter' => $request->counter,
                'total' => $request->total ?? null
            ]);
    
            if($invoice){
                return response()->json([
                    'message' => 'Facture créee avec succés',
                ]);
            }else{
                return response()->json([
                    'error' => 'Echec de création de la facture',
                ]);
            }
        }catch(\Exception $e){
            \Log::error('Error while storing invoice '. $e->getMessage());
            return response()->json([
                'error' => $e->getMessage(),
            ]);

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice $invoice)
    {
        // try{
        //     $request->validate([
        //         'subject' => 'required',
        //         'type' => 'required',
        //         'client' => "required|regex:/^[\p{L}\s'-]+$/u",
        //         'contract' => 'numeric',
        //         'counter' => 'required|numeric',
        //     ],[
        //         'subject.required' => 'Veuillez saisir l\'objet de la facture',
        //         'type.required' => 'Veuillez saisir le type d\'opération',
        //         'client.required' => 'Veuillez saisir le nom du client',
        //         'client.regex' => 'Le nom du client doit être alphabétique',
        //         'contract.numeric' => 'Le numéro de contract doit être numérique',
        //         'counter.required' => 'Veuillez indiquer le nombre des compteurs',
        //         'counter.numeric' => 'Le nombre de compteurs doit être numérique',
        //     ]);
    
        //     $result = $invoice->update([
        //         'subject' => $request->subject,
        //         'type' => $request->type,
        //         'client' => $request->client,
        //         'contract' => $request->contract,
        //         'counter' => $request->counter
        //     ]);
    
        //     if($invoice){
        //         return response()->json([
        //             'message' => 'Facture modifiée avec succés',
        //         ]);
        //     }else{
        //         return response()->json([
        //             'message' => 'Echec de modification de la facture',
        //         ]);
        //     }
        // }catch(\Exception $e){
        //     \Log::error('Error while updating invoice '. $e->getMessage());
        //     return response()->json([
        //         'message' => 'Erreur lors de modification de la facture',
        //     ]);

        // }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        try{
            $result = $invoice->delete();
            if($result){
                return response()->json([
                    'message' => "Facture supprimée avec succés",
                ]);
            }else{
                return response()->json([
                    'message' => 'Echec de suppression de la facture',
                ]);
            }
        }catch(\Exception $e){
            \Log::error('Error while deleting part: '. $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de suppression de la facture',
            ]);
        }
    }
}

