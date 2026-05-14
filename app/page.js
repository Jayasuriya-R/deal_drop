import { Button } from "@/components/ui/button";
import { LoaderIcon, LogIn } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
   
     <main className="main-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200  sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Image src={"/public/deal-drop-logo.png"} alt="Deal Drop Logo" 
             width={600}
             height={200}
             className="h-10 w-auto"/>
          </div>
          <Button variant="default" size="sm" className="bg-orange-600 hover:bg-orange-500 gap-2">
            <LogIn className="w-4 h-4"/>
            Sign In
          </Button>
        </div>
      </header>

     </main>
  );
}
