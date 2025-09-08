import { Leaf } from "lucide-react";
import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function BrandLogo({ 
  size = "md", 
  showText = true, 
  className = "" 
}: BrandLogoProps) {
  const sizeConfig = {
    sm: {
      icon: "w-6 h-6",
      iconContainer: "w-6 h-6",
      leafSize: "w-4 h-4",
      title: "text-sm font-bold",
      subtitle: "text-xs -mt-0.5"
    },
    md: {
      icon: "w-8 h-8", 
      iconContainer: "w-8 h-8",
      leafSize: "w-5 h-5",
      title: "text-xl font-bold",
      subtitle: "text-xs -mt-1"
    },
    lg: {
      icon: "w-12 h-12",
      iconContainer: "w-12 h-12", 
      leafSize: "w-8 h-8",
      title: "text-2xl font-bold",
      subtitle: "text-sm -mt-1"
    }
  };

  const config = sizeConfig[size];

  return (
    <Link href="/" className={`flex items-center space-x-3 ${className}`}>
      <div className={`flex items-center justify-center ${config.iconContainer} bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg shadow-lg`}>
        <Leaf className={`${config.leafSize} text-white`} />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`${config.title} bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent`}>
            FoodShare
          </span>
          <span className={`${config.subtitle} text-content-muted font-medium`}>
            Platform
          </span>
        </div>
      )}
    </Link>
  );
}
