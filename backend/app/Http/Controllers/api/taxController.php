<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Tax;
use Illuminate\Http\Request;

class taxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $taxes = Tax::all();
            if(!$taxes){
                return response()->json([
                    'message' => 'Aucune taxe trouvée'
                ]);
            }
            return response()->json([
                'data' => $taxes,
            ]);
        }catch(\Exception $e){
            \Log::error('Error while fetching taxes '. $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de récupération des taxes',
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
                'type' => 'required',
                'rate' => 'required|numeric'
            ],[
                'type.required' => 'Veuillez saisir le type de la taxe',
                'rate.required' => 'Veuillez saisir le taux de la taxe',
                'rate.numeric' => 'Le taux de la taxe doit être numérique'
            ]);

            $result = Tax::create([
                'type' => $request->type,
                'rate' => $request->rate
            ]);

            if(!$result){
                return response()->json([
                    'message' => 'Echec d\'enregistrement de la taxe'
                ]);
            }else{
                return response()->json([
                    'message' => 'Taxe ajoutée avec succés'
                ]);
            }

        }catch(\Exception $e){
            \Log::error('Error while creating a Tax '. $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de création de la taxe'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Tax $tax)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tax $tax)
    {
        try{
            $request->validate([
                'type' => 'sometimes|required',
                'rate' => 'sometimes|required|numeric'
            ],[
                'type.required' => 'Veuillez saisir le type de la taxe',
                'rate.required' => 'Veuillez saisir le taux de la taxe',
                'rate.numeric' => 'Le taux de la taxe doit être numérique'
            ]);

            $result = $tax->update([
                'type' => $request->type,
                'rate' => $request->rate
            ]);

            if(!$result){
                return response()->json([
                    'message' => 'Echec de modification de la taxe'
                ]);
            }else{
                return response()->json([
                    'message' => 'Taxe modifiée avec succés'
                ]);
            }

        }catch(\Exception $e){
            \Log::error('Error while updating Tax '. $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de modification de la taxe'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tax $tax)
    {
        try{
            $result = $tax->delete();
            if(!$result){
                return response()->json([
                    'message' => 'Echec de suppression de la taxe'
                ]);
            }else{
                return response()->json([
                    'message' => 'Taxe suprrimée avec succés'
                ]);
            }
        }catch(\Exception $e){
            \Log::error('Error while deleting Tax '. $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de suppression de la taxe'
            ]);
        }
    }
}
