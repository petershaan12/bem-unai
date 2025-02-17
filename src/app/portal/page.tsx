import Image from "next/image";
import Link from "next/link";
import { getAllPortal } from "../lib/portal";

export default async function page() {
    const data = await getAllPortal();

    return (
        <main className="relative container mx-auto p-8 py-16 sm:py-4 flex flex-col mt-8 justify-center min-h-screen">
            <Image
                alt="cover"
                className="object-cover absolute inset-0 w-full h-full"
                src="/bg-pemerintahan.png"
                width={1920}
                height={1080}
            />  <div className="flex flex-col items-center justify-center z-10">
                <div className=" mb-4 z-1 text-center">
                    <div className="avatar placeholder ">
                        <div className="bg-primary shadow-xl text-primary w-36  rounded-full p-8">
                            <Image src="/bem-logo.svg" alt="default" width={15} height={15} />
                        </div>
                    </div>
                    <h1 className="text-2xl text-center font-bold text-white mt-2">BEM UNAI</h1>
                    <h6 className="text-lg text-center opacity-50">#Dirandra #Nawasena</h6>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full max-w-4xl mx-auto">
                    {data.map((item: any) => (
                        <Link key={item.id} href={item.link} target="_blank" className="text-gray-400 border-2 uppercase border-white/30 hover:bg-gray-300/10 w-full px-6 py-4 rounded-full text-center flex items-center justify-center">
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}