"use server";

import Firecrawl from '@mendable/firecrawl-js';

export async function scrpeProduct(url) {
    try {
        // Move inside function so env var is guaranteed to be loaded
        const firecrawl = new Firecrawl({ apiKey: process.env.FIRE_CRAWL_API_KEY });


        const response = await firecrawl.scrape(url, {
    formats: [
        {
            type: 'json',
            prompt: `
Extract the following product details from the page:
- productName → exact product title
- currentPrice → current numeric price only (no currency symbol)
- currencyCode → currency like INR, USD, EUR
- productImageUrl → ONLY the main high-quality product image URL

IMPORTANT RULES:
- Do NOT return placeholder images
- Do NOT return transparent-background images  
- Do NOT return logos/icons/svg assets
- Prefer the largest product image
- Prefer JPG or PNG product images
- Return absolute image URLs only
- If multiple product images exist, return the primary/front image
            `,
            schema: {
                type: 'object',
                required: ['productName', 'currentPrice'],
                properties: {
                    productName: { type: 'string' },
                    currentPrice: { type: 'string' },
                    currencyCode: { type: 'string' },
                    productImageUrl: { type: 'string' },
                },
            },
        }
    ],
});

const extractedData = response.json;
        if (!extractedData) {
            throw new Error('No data extracted from URL');
        }

        return extractedData;

    } catch (error) {
        console.error('Error scraping product:', error);
        throw error;
    }
}