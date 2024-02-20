<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Seeder;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->text(10),
            'description'=> $this->faker->paragraph(1),
            'price'=>$this->faker->randomFloat(2, 100, 999),
            'image'=>$this->faker->imageUrl        
        ];
    }
}
