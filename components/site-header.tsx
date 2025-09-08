"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrandLogo } from "@/components/brand-logo";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Leaf, User, Menu, LogOut, Settings, UserCircle } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

export function SiteHeader() {
  const { data: session, isPending } = useSession();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <BrandLogo size="md" />

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link 
            href="/dashboard" 
            className="text-content-secondary hover:text-green-600 transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            href="/requests" 
            className="text-content-secondary hover:text-green-600 transition-colors"
          >
            Requests
          </Link>
          <Link 
            href="/api-docs" 
            className="text-content-secondary hover:text-green-600 transition-colors"
          >
            API Docs
          </Link>
          <Badge variant="secondary" className="text-xs">
            🌱 Eco-Friendly
          </Badge>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center space-x-2">
          {isPending ? (
            // Loading state
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse hidden md:block" />
            </div>
          ) : session?.user ? (
            // Logged in state
            <div className="flex items-center space-x-2">
              <span className="hidden md:inline text-sm text-content-secondary">
                Welcome, {session.user.name || session.user.email}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                      <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                        {session.user.name 
                          ? session.user.name.charAt(0).toUpperCase()
                          : session.user.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <UserCircle className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600 focus:text-red-600"
                    onClick={async () => {
                      await signOut();
                      window.location.href = "/";
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            // Not logged in state
            <>
              <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
                <Link href="/sign-in">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              
              <Button size="sm" asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/sign-up">Join Platform</Link>
              </Button>
            </>
          )}

          {/* Mobile menu trigger */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
