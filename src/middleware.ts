
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/buat-berita/create", "/kelola-pemerintahan/create"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path);
    const cookieStore = await cookies();
    const cookie = cookieStore.get('session')?.value;
    const session = await decrypt(cookie);

    if(isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/letsgo", req.nextUrl));
    }

    return NextResponse.next();
};