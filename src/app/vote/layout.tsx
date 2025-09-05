"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col">{children}</div>
    </SessionProvider>
  );
}
