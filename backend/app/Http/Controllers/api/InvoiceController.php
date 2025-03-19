<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Tax;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


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
                    'error' => 'Aucune facture trouvée'
                ]);
            }
            return response()->json([
                'data' => $invoices,
            ]);
        }catch(\Exception $e){
            Log::error('Error while fetching Invoices '. $e->getMessage());
            return response()->json([
                'error' => $e->getMessage(),
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
                'type' => 'nullable',
                'client' => "required|regex:/^[\p{L}\s'-]+$/u",
                'contract' => 'nullable|numeric',
                'counter' => 'required|numeric',
                'total' => 'nullable|numeric',
            ],[
                'subject.required' => 'Veuillez saisir l\'objet de la facture',
                'client.required' => 'Veuillez saisir le nom du client',
                'client.regex' => 'Le nom du client doit être alphabétique',
                'contract.numeric' => 'Le numéro de contract doit être numérique',
                'counter.required' => 'Veuillez indiquer le nombre des compteurs',
                'counter.numeric' => 'Le nombre de compteurs doit être numérique',
                'total.numeric' => 'Le total doit être numérique',
            ]);
    
            $invoice = Invoice::create([
                'subject' => $request->subject,
                'type' => $request->type ?? null,
                'client' => $request->client,
                'contract' => $request->contract ?? null,
                'counter' => $request->counter,
                'total' => $request->total ?? null
            ]);
    
            if($invoice){
                return response()->json([
                    'id' => $invoice->id,
                ]);
            }else{
                return response()->json([
                    'error' => 'Echec de création de la facture',
                ]);
            }
        }catch(\Exception $e){
            Log::error('Error while storing invoice '. $e->getMessage());
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
        try{
            return response()->json([
                'invoice' => $invoice,
                'taxes' => Tax::all()
            ]);
        }catch(\Exception $e){
            Log::error('Error while getting a single invoice '. $e->getMessage());
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice $invoice)
    { 
        try{
           
            $request->validate([
                'reference' => 'regex:/^[a-zA-Z0-9]+$/'
            ],[
                'reference.regex' => 'La réference ne doit contenir que des chiffres ou des lettres'
            ]);
    

            $result = $invoice->update([
                'reference' => $request->reference,
            ]);
    
            if($invoice){
                return response()->json([
                    'message' => 'Facture modifiée avec succés',
                ]);
            }else{
                return response()->json([
                    'message' => 'Echec de modification de la facture',
                ]);
            }
        }catch(\Exception $e){
            \Log::error('Error while updating invoice '. $e->getMessage());
            return response()->json([
                'message' => $e->getMessage(),
            ]);

        }
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
                    'error' => 'Echec de suppression de la facture',
                ]);
            }
        }catch(\Exception $e){
            \Log::error('Error while deleting part: '. $e->getMessage());
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }
}

