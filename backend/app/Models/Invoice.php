<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $guarded = ['id'];

    public function parts()
    {
        return $this->belongsToMany('bills', 'invoiceId', 'partId')->withPivot('quantity');
    }
}
