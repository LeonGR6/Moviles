<?php

namespace Database\Seeders;

use App\Models\ProductImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        foreach ($categories as $category) {
            Product::factory(100)->create(['categories_id' => $category->id])->each(function ($product) {
                ProductImage::factory()
                    ->count(2)
                    ->create(['product_id' => $product->id]);
            });

        }
    }
}
