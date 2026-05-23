"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { AuthModal } from './ui/AuthModal';
import { addProducts } from '@/app/action';
import { toast } from 'sonner';

function AddProductForm({ user }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setShowAuthModal(true);
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("url", url);

        const result = await addProducts(formData);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success(result.message || "Product tracked successfully!");
            setUrl("");

        }
        setLoading(false);

    };
    return (
        <div className="mt-10">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center"
            >

                <Input
                    type="url"
                    placeholder="Paste product URL (Amazon, Flipkart, Zara, etc.)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={loading}
                    required
                        className="h-12 sm:h-14 flex-1 rounded-xl border-gray-300 bg-white px-5 text-base font-medium shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                />

                <Button
                    type="submit"
                    size="xl"
                    disabled={loading}
                    className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl bg-orange-600 text-base font-bold shadow-sm transition-all hover:bg-orange-500 hover:shadow-md w-full sm:w-auto"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin w-5 h-5 mr-2" />
                            Tracking...
                        </>
                    ) : (
                        "Track Price"
                    )}
                </Button>

            </form>

            <AuthModal
                isOpen={showAuthModal}
                onOpenChange={setShowAuthModal}
            />
        </div>
    )
}

export default AddProductForm