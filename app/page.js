import Image from "next/image";
import { FEATURES } from "@/utils/constants";
import FeatureCard from "@/components/ui/FeatureCard";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/ui/AuthButton";

export default function Home() {
  const products = []
  return (

    <main className="main-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200  sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/deal-drop-logo.png" alt="Deal Drop Logo"
              width={600}
              height={200}
              className="h-10 w-auto" />
          </div>
          <AuthButton/>
        </div>
      </header>
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-orange-600 bg-orange-50 text-orange-700 text-sm font-medium mb-4">
            Never miss a deal again!
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to <span className="text-orange-600">Deal Drop</span> - Your Ultimate Price Tracking Companion!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Track prices across all your favorite e-commerce sites with ease. Get instant alerts when prices drop, save money effortlessly.
          </p>

           <AddProductForm/>
          {
           products.length === 0 && 
           <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            {FEATURES.map((feature)=>{
              return (
                <FeatureCard key={feature.title} feature={feature} />
              );  
            })}
           </div>
          }
        </div>

      </section>
    </main>
  );
}
