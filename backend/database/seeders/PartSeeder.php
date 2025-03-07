<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $parts = [
            ['label' => 'Collier AC PVC 60*20', 'price' => 75.01, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Collier AC PVC 63*40', 'price' => 74.84, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Collier AC PVC 63*20', 'price' => 65.03, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Collier AC PVC 80*40', 'price' => 72.81, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Collier AC PVC 60*40', 'price' => 70.04, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Collier AC PVC 100*40', 'price' => 79.39, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Collier AC PVC 110*40', 'price' => 75.99, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Robinet PEC 20*3/4', 'price' => 139.85, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Robinet PEC 40*1"1/2', 'price' => 310.86, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Tuyau Poly HD 10k20', 'price' => 2.43, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Tuyau Poly HD 10k25', 'price' => 3.81, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Tuyau Poly HD 10k50', 'price' => 14.43, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Couvercle tabernacle', 'price' => 7.50, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Tube PVC 6K DN 75', 'price' => 11.75, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Bouche a clé', 'price' => 52.09, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Raccord SRM L 20*1/2', 'price' => 19.90, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Raccord SRM L 25*1/2', 'price' => 21.58, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Raccord SRM L 25*3/4', 'price' => 19.56, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Raccord SRM L 50*1"1/2', 'price' => 123.09, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Robinet Arret TCE 1/2', 'price' => 42.00, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Raccord compteur 15', 'price' => 12.50, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Vanne Bronze F 11/2', 'price' => 86.70, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Coude SRM 50*1"1/2', 'price' => 131.70, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Mamelon double Lait 1/2', 'price' => 8.29, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Clapet RE 1/2', 'price' => 14.13, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Clapet RE 1"1/4', 'price' => 64.89, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Clapet RE 1"1/2', 'price' => 74.43, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Pose Tuyau pol HD 25', 'price' => 26.70, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Pose Tuyau pol HD 50', 'price' => 26.70, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Manchon SRF 1/2', 'price' => 38.52, 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('parts')->insert($parts);

        
    }
}
