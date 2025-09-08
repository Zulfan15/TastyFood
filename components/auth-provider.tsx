"use client";

import React from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Better Auth doesn't require a Provider component in the current version
  // The auth client works globally without wrapping components
  return <>{children}</>;
}
