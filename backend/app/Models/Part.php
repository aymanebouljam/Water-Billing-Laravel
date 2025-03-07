<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    protected $guarded = ['id'];

    public function invoices()
    {
        return $this->belongsToMany('bills', 'partId', 'invoiceId')->withPivot('quantity');
    }
}
