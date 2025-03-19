<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Part;
use App\Models\Tax;

class Invoice extends Model
{
    protected $guarded = ['id'];

    public function parts()
    {
        return $this->belongsToMany(Part::class, 'bills', 'invoiceId', 'partId')
                    ->withPivot('quantity');
    }

    public function  getTotalAttribute(){
        $subtotal = 0;
      
        foreach($this->parts as $part){
            $subtotal += $part->price * $part->pivot->quantity;
        }
        $taxes = Tax::all();
        $total = $subtotal;
        foreach($taxes as $tax){
            $total += ($total * $tax->rate) ;
        }

        return $total;
    }
}
