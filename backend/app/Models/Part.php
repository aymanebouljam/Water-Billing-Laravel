<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Invoice;

class Part extends Model
{
    protected $guarded = ['id'];

    public function invoices()
    {
        return $this->belongsToMany(Invoice::class, 'bills', 'invoiceId', 'partId')
                    ->withPivot('quantity');
    }
}
