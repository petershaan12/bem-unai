"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/vote" })}
      className="px-5 py-3 font-bold bg-white rounded-lg text-black flex gap-5 items-center"
    >
      <Image src="/icon/google.svg" alt="Google Icon" width={24} height={24} />
      Masuk Akun Email Unai Edu
    </button>
  );
}
