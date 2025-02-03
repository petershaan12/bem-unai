import { Form, redirect, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { authenticator } from "~/utils/auth.server";
import { sessionStorage } from "~/utils/session.server";

export async function action({ request }: { request: Request }) {
    try {
        let user = await authenticator.authenticate("user-pass", request);
        let session = await sessionStorage.getSession(request.headers.get("cookie"));
        session.set("user", user);
        throw redirect("/create", {
            headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
        });
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        throw error;
    }
}

export async function loader({ request }: { request: Request }) {
    let session = await sessionStorage.getSession(request.headers.get("cookie"));
    let user = session.get("user");
    if (user) throw redirect("/create");
    return {};
}

export default function Index() {
    const actionData = useActionData<{ error?: string }>();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
    };

    useEffect(() => {
        if (actionData?.error) {
            setIsLoading(false);
        }
    }, [actionData]);

    return (
        <main className="container mx-auto p-4 flex flex-col justify-center items-center h-screen">
            <h2 className="text-4xl font-bold mb-4">Login</h2>
            <Form method="post" className="space-y-4 mb-12" onSubmit={handleSubmit}>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="Email Address" className="w-full input input-bordered input-secondary text-primary" />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="Enter Password" className="w-full input input-bordered input-secondary text-primary" />
                </div>
                <div className="flex justify-center">
                    {isLoading ? <span className="loading loading-spinner loading-xl text-center mt-5"></span> :
                        <button className="bg-gradient-to-r w-full from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black">
                            Login
                        </button>
                    }
                </div>
                {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
            </Form>
        </main>
    );
}