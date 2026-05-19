'use server'
import Image from "next/image";
import { FEATURES } from "@/utils/constants";
import FeatureCard from "@/components/ui/FeatureCard";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/ui/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { Package, TrendingDown } from "lucide-react";
import { getProducts } from "./action";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const supabase = await createClient()

  const response = await supabase.auth.getUser()
  console.log(response.data)
  const user = response.data.user
  const products = user ? await getProducts() : [];

  console.log(" products", products);
  return (

    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col gap-4 items-center justify-between sm:flex-row">

          <div className="flex items-center gap-3">
            <Image
              src="/deal-drop-logo.png"
              alt="Deal Drop Logo"
              width={600}
              height={200}
              className="h-11 w-auto"
            />
          </div>

          <AuthButton user={user} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">

          <div className="inline-flex items-center px-5 py-2.5 rounded-full border border-orange-600 bg-orange-50 text-orange-700 text-sm font-semibold mb-6 shadow-sm">
            Never miss a deal again!
          </div>

          <h2 className="text-4xl lg:text-5xl font-black tracking-[-0.03em] text-gray-900 leading-tight max-w-5xl mx-auto">
            Welcome to{" "}
            <span className="text-orange-600">
              Deal Drop
            </span>{" "}
            — Your Ultimate Price Tracking Companion!
          </h2>

          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mt-6 mb-8 leading-relaxed font-medium">
            Track prices across all your favorite e-commerce sites with ease.
            Get instant alerts when prices drop and save money effortlessly.
          </p>

          <AddProductForm user={user} />

          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-7 max-w-5xl mx-auto mt-14">
              {FEATURES.map((feature) => {
                return (
                  <FeatureCard
                    key={feature.title}
                    feature={feature}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Products */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">

          {/* Header */}


          <div className="flex items-center justify-between px-1 mb-7">

            <div className="flex items-center gap-3">

              <h2 className="text-[34px] lg:text-[38px] font-black tracking-[-0.03em] text-gray-900">
                Your Tracked Products
              </h2>

              {/* Product Count Indicator */}
              <div className="relative">

                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-orange-100 border border-orange-200">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>

                <div className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-orange-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md">
                  {products.length}
                </div>

              </div>

            </div>

          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-1.5"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {user && products.length == 0 && (
        <section className="max-w-2xl mx-auto px-6 pb-24 text-center">

          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 shadow-sm">

            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-5" />

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Products Yet
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed">
              Add your first product above to start tracking prices.
            </p>

          </div>
        </section>
      )}
    </main>
  );
}
