import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">FoodShare</span>
                <span className="text-xs text-gray-400 -mt-1">Platform</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting food donors with receivers to reduce waste and help communities within a 5km radius.
            </p>
            <div className="flex items-center text-sm text-gray-400">
              <Heart className="w-4 h-4 mr-2 text-red-500" />
              Made with love for the environment
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/dashboard" className="text-gray-400 hover:text-green-400 transition-colors">
                Dashboard
              </Link>
              <Link href="/requests" className="text-gray-400 hover:text-green-400 transition-colors">
                Manage Requests
              </Link>
              <Link href="/api-docs" className="text-gray-400 hover:text-green-400 transition-colors">
                API Documentation
              </Link>
              <Link href="/sign-up" className="text-gray-400 hover:text-green-400 transition-colors">
                Join Platform
              </Link>
            </nav>
          </div>

          {/* For Users */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Users</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/sign-up" className="text-gray-400 hover:text-green-400 transition-colors">
                Become a Donor
              </Link>
              <Link href="/sign-up" className="text-gray-400 hover:text-green-400 transition-colors">
                Find Food Nearby
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                How It Works
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Safety Guidelines
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">hello@foodshare.platform</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+62 800 1234 5678</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 FoodShare Platform. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
