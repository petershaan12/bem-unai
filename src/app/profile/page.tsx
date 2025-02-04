
import { redirect } from "next/navigation";
import { getUser } from "../lib/auth";
import Logout from "./Logout";
import Image from "next/image";

export default async function page() {
    const user = await getUser();
    if (!user) {
        redirect('/');
    }
    return (
        <main className="relative container mx-auto p-4 flex flex-col items-center justify-center h-screen">
            <Image
                alt="cover"
                loading="lazy"
                decoding="async"
                className="object-fit z-0 w-full h-full"
                src="/bg-pemerintahan.png"
                layout="fill"
                objectFit="cover"
            />
            <div className="flex flex-col items-center justify-center z-10">
                <div className="avatar placeholder mb-4 z-1 ">
                    <div className="bg-secondary shadow-xl text-primary w-36 text-3xl rounded-full">
                        {user.name.substring(0, 2).toUpperCase()}
                    </div>
                </div>
                <h2 className="text-4xl font-bold mb-4">{user.name}</h2>
                <p className="mb-6">{user.email}</p>
                <Logout />
            </div>
        </main>
    )
}