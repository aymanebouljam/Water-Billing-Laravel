<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Part;

class Invoice extends Model
{
    protected $guarded = ['id'];

    public function parts()
    {
        return $this->belongsToMany(Part::class, 'bills', 'invoiceId', 'partId')
                    ->withPivot('quantity');
    }

    public function  getTotalAttribute(){
        $total = 0;

        foreach($this->parts as $part){
            $total += $part->price * $part->pivot->quantity;
        }

        return $total;
    }
}
