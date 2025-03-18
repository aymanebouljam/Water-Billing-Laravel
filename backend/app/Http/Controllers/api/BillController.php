<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use App\Models\Invoice;
use App\Models\Part;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;


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
                '*.invoiceId' => 'required|exists:invoices,id',
                '*.partId' => 'required|exists:parts,id',
                '*.quantity' => 'required|numeric|min:1',
            ],[
                '*.invoiceId.required' => 'L\'ID de la facture est requis.',
                '*.invoiceId.exists' => 'Cette facture n\'existe pas.',
                '*.partId.required' => 'L\'ID de la pièce est requis.',
                '*.partId.exists' => 'Cette pièce n\'existe pas.',
                '*.quantity.required' => 'La quantité est requise.',
                '*.quantity.numeric' => 'La quantité doit être un nombre.',
                '*.quantity.min' => 'La quantité doit être au moins 1.',
            ]);

            $bills = $request->all();
            $data = [];
        
            foreach($bills as $bill){
                array_push($data, [
                    'invoiceId' => $bill['invoiceId'],
                    'partId' => $bill['partId'],
                    'quantity' => $bill['quantity'],
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]);
            }
            log::info('Bills array', $data);
            Bill::insert($data);
            $invoice = Invoice::find($data[0]['invoiceId']);
            if(!$invoice){
               return response()->json(['error' => 'Facture non trouvée'], 400);
            }
            $total = $invoice->calculateTotal;
            $invoice->update([
                'total' => $invoice->total,
            ]);
            return response()->json([
                'message' => 'Facture crée avec succés: '.$total,
            ]);

        }catch(\Exception $e){
            log::error('Error while storing Bill '. $e->getMessage());
            return response()->json(['error' => $e->getMessage()]);
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
