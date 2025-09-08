"use client";

import { authClient } from "@/lib/auth-client";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <authClient.Provider>
      {children}
    </authClient.Provider>
  );
}
