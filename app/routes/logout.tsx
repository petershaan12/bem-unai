
import { json, redirect } from "@remix-run/node";
import { sessionStorage } from "~/utils/session.server";

export async function action({ request }: { request: Request }) {
    let session = await sessionStorage.getSession(request.headers.get("cookie"));
    return redirect("/", {
        headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
    });
}

export async function loader({ request }: { request: Request }) {
    let session = await sessionStorage.getSession(request.headers.get("cookie"));
    if (!session.get("userId")) return redirect("/letsgo");
    return json({});
}