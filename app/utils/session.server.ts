import { createCookieSessionStorage } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "__session",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets: [process.env.SESSION_SECRET!],
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
    },
});

export { sessionStorage };
