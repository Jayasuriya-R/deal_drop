import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({ apiKey: process.env.FIRE_CRAWL_API_KEY });

export async function scrpeProduct(url){
    try {
        const response = await firecrawl.scrape(url,{
           formats:[{type:'json',schema:{
            type:'object',
            required:[productName,currentPrice],  
            properties:{
                productName:{type:'string'},
                currentPrice:{type:'string'},
                currencyCode:{type:'string'},
                productImageUrl:{type:'string'},
            },
                 },
                 prompt:"Extract the product name as 'productName', the current price as number as 'currentPrice', the currency code (USD,EUR,etc) as 'currencyCode' and the product image url as 'productImageUrl' from the given url if available.",
                },],
        })

        const extractedData = response.json;
        if(!extractedData){
            throw new Error("No data extracted from URL")
        }
        return extractedData;
    } catch (error) {
        console.error("Error scraping product:", error);
        throw error;
    }
}