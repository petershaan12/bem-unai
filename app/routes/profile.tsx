import { redirect, useLoaderData } from "@remix-run/react";
import { sessionStorage } from "~/utils/session.server";

export default function Profile() {
    const user = useLoaderData<any>();
    return (
        <main className="container mx-auto p-4 flex flex-col items-center justify-center h-screen">
            <div className="avatar placeholder mb-4 ">
                <div className="bg-secondary shadow-xl text-primary w-36 text-3xl rounded-full">
                    {user.name.substring(0, 2).toUpperCase()}
                </div>
            </div>
            <h2 className="text-4xl font-bold mb-4">{user.name}</h2>
            <p className="mb-6">{user.email}</p>
            <form method="post" action="/logout" className="mt-8 border-2 border-white/30 hover:bg-gray-300/10 w-fit px-6 py-4 rounded-full">
                <button type="submit" className="text-gray-400">Logout</button>
            </form>
        </main>
    )
}

export async function loader({ request }: { request: Request }) {
    let session = await sessionStorage.getSession(request.headers.get("cookie"));
    let user = session.get("user");
    if (!user) throw redirect("/");
    return user;
}