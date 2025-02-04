"use client"
import { logout } from "../lib/auth"

export default function Logout() {
    return (
        <button onClick={() => logout()}type="submit" className="text-gray-400 mt-8 border-2 border-white/30 hover:bg-gray-300/10 w-fit px-6 py-4 rounded-full">Logout</button>
    )
}