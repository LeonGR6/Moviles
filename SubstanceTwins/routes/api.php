<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderStatusController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



Route::middleware('auth:api')->group(function(){
    Route::get('/user', function (Request $request) {
    return $request->user();
    });
    Route::get('/users',[UserController::class,'index']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
    Route::post('/logout',[AuthController::class,'logout']);
    Route::apiResource('/orders',OrderController::class);
    Route::apiResource('/product', ProductController::class);
    Route::apiResource('/category', CategoryController::class);
});





Route::resource('/products', ProductController::class)->only([
    'index','show'
]);
Route::resource('/categories', CategoryController::class)->only([
    'index'
]);
Route::apiResource('/orderstates', OrderStatusController::class);


//Auth
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

