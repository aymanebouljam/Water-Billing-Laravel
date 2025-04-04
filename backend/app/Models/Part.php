<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Invoice;

class Part extends Model
{
    protected $guarded = ['id'];
    protected $casts = [
        'price' => 'float',
    ];

    public function invoices()
    {
        return $this->belongsToMany(Invoice::class, 'bills', 'invoiceId', 'partId')
                    ->withPivot('quantity');
    }
}
