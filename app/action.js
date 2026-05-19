'use server'

import { scrpeProduct } from "@/lib/firecrawl"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { use } from "react"

export async function signOut() {
   const supabase = await createClient()

   await supabase.auth.signOut()

   revalidatePath('/')
   redirect('/')
}

export async function addProducts(formData){
   const url = formData.get('url')
   if(!url) return 

   try {
      const supabase = await createClient()
      const {data:{user}} = await supabase.auth.getUser()
       if(!user) return {error:'Unauthorized'}

       const productData = await scrpeProduct(url);
        console.log("productData", productData);
       if(!productData.productName || !productData.currentPrice){
         return {error:'Failed to extract product data. Please check the URL and try again.'}
       }

       const newPrice = parseFloat(productData.currentPrice);
       const currency = productData.currencyCode || 'USD';

       const {data: existingProduct} =  await supabase
         .from('products')
         .select('id,current_price')
         .eq('user_id', user.id)
         .eq('url', url)
         .single();

         const isUpdated = !!existingProduct

         const {data: product, error} = await supabase.from('products').upsert(
            {
               user_id: user.id,
               url,
               name: productData.productName,
               current_price: newPrice,
               currency,
               image_url : productData.productImageUrl,
               updated_at: new Date().toISOString(),
            },
            {
               onConflict: 'user_id,url',
               ignoreDuplicates: false,
            }
         ).select().single();

         if(error) throw error

         const shouldAddHistory = isUpdated || existingProduct.current_price !== newPrice;

         if(shouldAddHistory){
            await supabase.from('price_history').insert({
               product_id: product.id,
               price: newPrice,
               currency,
            })
         }
         revalidatePath('/');

         return {
            success: true,
            product,
            message: isUpdated ? 'Product updated with latest price!' : 'Product added successfully',
         }

   } catch (error) {
      console.error('Error adding/updating product:', error);
      return { error: 'An error occurred while adding/updating the product.' };
   }
}

export async function deleteProduct(productId){

   try {
       const supabase = await createClient();

       const {error} = await supabase
       .from('products')
         .delete()
         .eq('id', productId)

         if (error) throw error

         revalidatePath('/');
         return {success:true}
   } catch (error) {
      console.error('Error deleting product:', error);
      return { error: 'An error occurred while deleting the product.' };
   }
} 

export async function getProducts(){
   try {
      const supabase = await createClient();
      const {data,error} = await supabase
      .from('products')
      .select('*')
      .order('created_at', {ascending: false})

      if(error) throw error
      return data || []
   } catch (error) {
      console.error('Error fetching products:', error);
      return { error: 'An error occurred while fetching products.' };   
   }
}
   
export async function getPriceHistory(productId){
   try {
      const supabase = await createClient();
      const {data,error} = await supabase
      .from('price_history')
      .select('*')
      .eq('product_id', productId)
      .order('checked_at', {ascending: false});

      if(error) throw error
      return data || []
   } catch (error) {
      console.error('Error fetching price history:', error);
      return { error: 'An error occurred while fetching price history.' };
   }
}
