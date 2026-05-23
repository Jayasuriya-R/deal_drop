'use client'
import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react';
import { deleteProduct } from '@/app/action';
import PriceChart from './PriceChart';
import { toast } from 'sonner';

function ProductCard({ product, isExpanded, onToggle }) {
    const [deleting, setDeleting] = React.useState(false);

    const handleCardDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this product from tracking?"
        );

        if (!confirmed) return;

        try {
            setDeleting(true);
            const result = await deleteProduct(product.id);

            if (result?.error) {
                toast.error(result.error);
                return;
            }

            toast.success(result.message || "Product deleted successfully!");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Card className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <CardContent className="p-5">

                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                            src={
                                product.image_url &&
                                !product.image_url.includes("transparent-background")
                                    ? product.image_url
                                    : "/placeholder-product.png"
                            }
                            alt={product.name}
                                className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 uppercase">
                            {product.name}
                        </h3>

                        <div className="mt-2 flex items-center gap-3 flex-wrap">
                            <span className="text-3xl font-bold text-orange-600">
                                {product.currency} {product.current_price}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                ↘ Tracking
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                        variant="outline"
                        className="rounded-lg"
                        onClick={onToggle}
                    >
                        {isExpanded ? (
                            <><ChevronUp />Hide Chart</>
                        ) : (
                            <><ChevronDown />Show Chart</>
                        )}
                    </Button>

                    <Button variant="outline" asChild className="rounded-lg">
                        <a href={product.url} target="_blank" rel="noopener noreferrer">
                            ↗ View Product
                        </a>
                    </Button>

                    <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        onClick={handleCardDelete}
                        disabled={deleting}
                    >
                        🗑 Remove
                    </Button>
                </div>
            </CardContent>

            {isExpanded && (
                <CardFooter className="border-t border-gray-100 bg-gray-50/40">
                    <div className="w-full rounded-xl bg-white p-4">
                        <PriceChart productId={product.id} />
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}

export default ProductCard