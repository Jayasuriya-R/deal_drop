"use server";

import { sendEmailAlert } from "@/lib/email";
import { scrpeProduct } from "@/lib/firecrawl";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({message:'Cron job works!'})
}

export async function POST(request){
    let results = {
        total: 0,
        updated: 0,
        failed: 0,
        changed: 0
    }

    try {
        const authHeader = request.headers.get('authorization');
        const cronSecret = process.env.CRON_SECRET;

        if(!cronSecret || authHeader !== `Bearer ${cronSecret}`){
            return NextResponse.json({error:'Unauthorized'}, {status:401})
        }
        
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
        )

        const {data: products, error: productsError} = await supabase
            .from('products')
            .select('*')

        if(productsError) throw productsError

        const items = products ?? []
        results.total = items.length

        for (const product of items){
            try {
                const productData = await scrpeProduct(product.url);

                if(!productData.currentPrice){
                    results.failed++;
                    continue;
                }

                const newPrice  = parseFloat(productData.currentPrice);
                const oldPrice = parseFloat(product.current_price);

                await supabase.from('products').update({
                    current_price: newPrice,
                    currency: productData.currencyCode || product.currency,
                    name: productData.productName || product.name,
                    image_url: productData.productImageUrl || product.image_url,
                    updated_at: new Date().toISOString(),
                }).eq('id', product.id);

                if(newPrice !== oldPrice){
                    await supabase.from('price_history').insert({
                        product_id: product.id,
                        price: newPrice,
                        currency: productData.currencyCode || product.currency,
                    });
                    results.changed++;

                    const { data, error: userError } = await supabase.auth.admin.getUserById(product.user_id);
                    const user = data?.user
                    if(userError){
                        console.error('Failed to load user for alert:', userError);
                    }

                    if(newPrice < oldPrice && user?.email){
                        await sendEmailAlert(user.email, product, oldPrice, newPrice);
                    }
                }

                results.updated++;
            } catch (error) {
                console.error(`Failed to update product ${product?.id}:`, error);
                results.failed++;
            }
        }

        return NextResponse.json({success:true,message:'Prices checked successfully', results})

    } catch (error) {
        console.error('Error occurred while checking prices:', error);
        return NextResponse.json({error:'Internal Server Error'}, {status:500});
    }
}
