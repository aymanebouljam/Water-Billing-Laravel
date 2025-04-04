<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Part;
use Illuminate\Http\Request;

class PartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $parts = Part::all();
            if(!$parts){
                return response()->json([
                    'message' => 'Aucune pièce trouvée'
                ]);
            }
            return response()->json([
                'data' => $parts,
            ]);
        }catch(\Exception $e){
            \Log::error('Error while fetching Parts '. $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de récupération des pièces',
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
                'label' => 'required',
                'price' => 'required|numeric'
            ],[
                'label.required' => 'Veuillez saisir la désignation de la pièce',
                'price.required' => 'Veuillez saisir le prix de la pièce',
                'price.numeric' => 'Le prix doit être numérique',
            ]);
    
            $part = Part::create([
                'label' => $request->label,
                'price' => $request->price,
            ]);
    
            if($part){
                return response()->json([
                    'message' => 'Pièce ajoutée avec succés',
                ]);
            }else{
                return response()->json([
                    'error' => 'Echec de création de la pièce',
                ]);
            }
        }catch(\Exception $e){
            \Log::error('Error while storing part '. $e->getMessage());
            return response()->json([
                'error' => $e->getMessage(),
            ]);

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Part $part)
    {
        try{
            if(!$part){
                return response()->json(['error' => 'Pièce non trouvé']);
            }
            return response()->json(['data' => [
                'id' => $part->id,
                'label' => $part->label,
                'price' => $part->price
            ]]);
        }catch(\Exception){
            \Log::error('Error while retreiving a Part'. $e->getMessage());
            return response()->json(['error' =>  $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Part $part)
    {
        try{
            if(!$part){
                return response()->json([
                    'message' => 'Pièce non trouvée',
                ]);
                
            }
            $request->validate([
                'label' => 'required',
                'price' => 'required|numeric'
            ],[
                'label.required' => 'Veuillez saisir la désignation de la pièce',
                'price.required' => 'Veuillez saisir le prix de la pièce',
                'price.numeric' => 'Le prix doit être numérique',
            ]);
    
            $result = $part->update([
                'label' => $request->label,
                'price' => $request->price,
            ]);

            if($result){
                return response()->json([
                    'message' => 'Pièce modifiée avec succés',
                ]);
            }else{
                return response()->json([
                    'message' => 'Echec de modification de la pièce',
                ]);
            }
        }catch(\Exception $e){
            \Log::error('Error while updating part '. $e->getMessage());
            return response()->json([
                'message' => 'Erreur survenue lors de modification de la pièce'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Part $part)
    {
        try{
            $result = $part->delete();
            if($result){
                return response()->json([
                    'message' => "Pièce supprimée avec succés",
                ]);
            }else{
                return response()->json([
                    'message' => 'Echec de suppression de la pièce',
                ]);
            }
        }catch(\Exception $e){
            \Log::error('Error while deleting part: '. $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de suppression de la pièce',
            ]);
        }
    }
}
