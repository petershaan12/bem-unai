import { getOnePost } from "@/app/lib/pots";
import parse from 'html-react-parser';
import IncrementView from "./IncrementView";
import Image from "next/image";


export default async function Page({ params }: { params: Promise<{ slug: string}>}) {
    const { slug } = await params;
    const data = await getOnePost(slug);

    if (!data) {
        return <h1>Berita tidak ditemukan</h1>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4 pt-24 md:pt-32 pb-16">
            <div className="mb-5 md:mb-6 ">
                <h1 className="text-3xl font-bold mb-7 text-center">{data.title}</h1>
                <div className="flex flex-col md:flex-row md:justify-between items-center gap-y-5 md:items-end">
                    <div className="flex flex-col md:flex-row items-center justify-center mt-2 gap-2">
                        <h2 className="text-center font-semiBold text-gray-300 mr-4">Diselengarakan oleh:</h2>
                        <div className="flex md:flex-row items-center gap-4">
                            <Image
                                src={`/icon/${data.organisasi.image}.svg`}
                                alt="divisi"
                                className="w-8 h-8"
                                width={32}
                                height={32}
                            />
                            <div className="text-sm font-light">
                                <p>{data.organisasi.title}</p>
                                <p className="text-xs">{new Date(data.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                    </div>
                    <IncrementView prevView={data.views} slug={data.slug} />
                </div>
            </div>
            {data.bannerImage && (
                <Image
                    src={data.bannerImage}
                    alt={data.title}
                    className="w-full h-auto md:h-72 object-cover"
                    width={800}
                    height={208}
                />
            )}
            <div className="text-justify my-4 p-4">{parse(data.content)}</div>

        </div>
    );
}
