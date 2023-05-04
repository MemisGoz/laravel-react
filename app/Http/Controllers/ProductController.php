<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Http\Resources\ProductResource;
// use log
use Illuminate\Support\Facades\Log;
class ProductController extends Controller

{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProductResource :: collection(Product::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * 
     */
    
     public function store(Request $request)
     {
         $request->validate([
             'product_name' => 'required',
             'product_description' => 'required',
             'product_price' => 'required',
             'product_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:6048'
         ]);
     
         try {
             $product = new Product();
             $product->product_name = $request->product_name;
             $product->product_description = $request->product_description;
             $product->product_price = $request->product_price;
             $product->product_image = $request->file('product_image')->store('public/images');
             $imagePath = str_replace('public', 'storage', $product->product_image);
             $product->product_image = $imagePath;
             


             $product->save();
     
             return response()->json([
                 'status' => 200,
                 'message' => 'Product created successfully',
                 'data' => $product
             ]);
         } catch (\Exception $e) {
             return response()->json([
                 'status' => 500,
                 
                 'message' => $e->getMessage()
             ]);
         }
     }
     

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json(
            [
                'status' => 200,
                'message' => 'Product fetched successfully',
                'data' => $product
            ]
    
    );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
{
    try {
        
        
        $id = $request->input('id');

        if ($product->id != $id) {
            // the product ID in the request data does not match the ID of the product instance
            
        }

        // continue with the update process
        $request->validate([
            'product_name' => 'required',
            'product_description' => 'required',
            'product_price' => 'required',
            'product_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:6048'
        ]);

        if($request->hasFile('product_image')){
            $imageName = 'storage/images/' . Str::random().'.'.$request->product_image->getClientOriginalExtension();
            $request->product_image->move(public_path('storage/images'), $imageName);
            $product->update($request->post() + ['product_image' => $imageName]);
        } else {
            $product->update($request->post()); 
            
        }
        
        // Add logging here to check if the product was updated successfully
        Log::info('Product updated successfully', ['product_id' => $product->id]);

        return response()->json([
            'status' => 200,
            'message' => 'Product updated successfully'
        ]);

    } catch (\Exception $e) {
        // Add logging here to check the error message
        Log::error($e->getMessage());

        return response()->json([
            'status' => 400,
            'message' => $e->getMessage()
            
        ]);
    }
    
}


    

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
            
        $product->delete();

        return response("", 204);
    }
}
