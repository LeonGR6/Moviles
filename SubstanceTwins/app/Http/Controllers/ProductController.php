<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;


class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except('index', 'show');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('images')->get();
        return new ProductCollection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->has('images')) {
            // Almacenar las nuevas imágenes en el directorio storage/app/public/images
            $imagePaths = [];
            foreach ($request->images as $image) {
                // Decodificar la cadena base64 y guardarla como un archivo de imagen
                $imageData = base64_decode($image['uri']);
                $imageName = uniqid() . '.png'; // Nombre de archivo único para evitar colisiones
        


                $baseUrl = 'http://localhost:8888/Moviles/SubstanceTwins/public/storage/';
                $imagePath = $baseUrl . 'images/' . $imageName;
                $path = 'public/images/' . $imageName;
                $path = 'public/images/' . $imageName;
                Storage::put($path, $imageData);
                $imagePaths[] = $imagePath;

        
            }
        
            // Crear un nuevo producto
            $product = new Product;
            $product->name = $request->name;
            $product->description = $request->description;
            $product->categories_id = $request->categories_id;
            $product->price = $request->price;
            $product->save();
        
            // Asociar las imágenes al nuevo producto
            $product->images()->createMany(
                array_map(function ($path) {
                    return ['image_path' => $path];
                }, $imagePaths)
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        return response()->json(['product' => $product]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'categories_id' => $request->categories_id,
        ]);

        $product->save();


        if ($request->has('images')) {
            // Obtener las imágenes antiguas del producto
            $oldImages = $product->images()->pluck('image_path')->toArray();

            // Almacenar las nuevas imágenes en el directorio storage/app/public/images
            $imagePaths = [];
            foreach ($request->images as $image) {
                // Decodificar la cadena base64 y guardarla como un archivo de imagen
                $imageData = base64_decode($image['uri']);
                $imageName = uniqid() . '.png'; // Nombre de archivo único para evitar colisiones

                // Almacenar la imagen en el directorio storage/app/public/images
                $baseUrl = 'http://localhost:8888/Moviles/SubstanceTwins/public/storage/';
                $imagePath = $baseUrl . 'images/' . $imageName;

                $path = 'public/images/' . $imageName;
                Storage::put($path, $imageData);
                $imagePaths[] = $imagePath;
            }

            // Actualizar las rutas de las imágenes del producto
            $product->images()->delete(); // Eliminar las imágenes antiguas
            foreach ($imagePaths as $path) {
                $product->images()->create([
                    'image_path' => $path
                ]);
            }

            // Eliminar las imágenes antiguas del sistema de archivos
            foreach ($oldImages as $oldImage) {
                if (Storage::exists($oldImage)) {
                    Storage::delete($oldImage);
                }
            }




            return [
                'message' => 'Product updated successfully'
            ];
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    }
}
