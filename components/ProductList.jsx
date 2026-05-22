'use client'
import { useState } from 'react'
import ProductCard from './ProductCard'

function ProductList({ products }) {
    const [expandedId, setExpandedId] = useState(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-start">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    isExpanded={String(expandedId) === String(product.id)}
                    onToggle={() =>
                        setExpandedId(prev =>
                            String(prev) === String(product.id) ? null : String(product.id)
                        )
                    }
                />
            ))}
        </div>
    )
}

export default ProductList