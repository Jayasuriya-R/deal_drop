"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

function AddProductForm({ user }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => { 
        e.preventDefault();
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='w-full max-w-2xl mx-auto flex gap-2 items-center mt-6'>
                <Input
                    type='url'
                    placeholder="Paste product URL (Amazon, Flipkart, etc.)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={loading}
                    required
                    className="h-10 text-base border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Button type="submit" size='lg' className='bg-orange-600 hover:bg-orange-500' disabled={loading}>
                    {
                        loading ? (<>
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        Tracking...
                        </>) : "Track Price"
                    }
                </Button>
            </form>
        </div>
    )
}

export default AddProductForm