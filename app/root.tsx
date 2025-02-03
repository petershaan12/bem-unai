import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { authenticator } from "./utils/auth.server";
import { sessionStorage } from "./utils/session.server";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: { request: Request }) {
  let session = await sessionStorage.getSession(request.headers.get("cookie"));
  let user = session.get("user");
  return json({ user: user || null });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useLoaderData<{ user: any }>() || { user: null };
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-primary text-white">
        <Navbar user={user} />
        {children}
        <ScrollRestoration />
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <h2 className="text-5xl">404 | Not Found</h2>
      <p className="text-sm">Maaf, Halaman yang anda cari tidak tersedia</p>
      <a
        className="flex w-full items-center justify-center gap-2 transition-all hover:gap-5"
        href="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-left h-4 w-4"
          aria-hidden="true"
        >
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        Kembali
      </a>
    </div>
  );
}