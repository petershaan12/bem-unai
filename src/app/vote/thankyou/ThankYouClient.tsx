// app/vote/thankyou/thankyou-client.tsx
"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function ThankYouClient() {
  useEffect(() => {
    const timer = setTimeout(() => {
      signOut({ callbackUrl: "/vote" });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="container mx-auto p-4 flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-3xl font-bold">Terima kasih dan sampai jumpa 👋</h1>
      <p className="text-xl font-light mt-5 mb-10">
        Anda akan otomatis logout dalam 3 detik. Bukti partisipasi sudah
        tercatat di email
      </p>
    </main>
  );
}
