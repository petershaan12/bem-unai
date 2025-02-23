
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = [
    "/kelola-informasi",
    "/kelola-informasi/create",
    "/kelola-informasi/edit",
    "/kelola-pemerintahan",
    "/kelola-pemerintahan/create", 
    "/kelola-pemerintahan/edit",
    "/kelola-portal",
    "/kelola-portal/create",
    "/kelola-portal/edit",
    "/profile",
];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path);
    const cookieStore = await cookies();
    const cookie = cookieStore.get('session')?.value;
    const session = await decrypt(cookie);

    if(isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
};