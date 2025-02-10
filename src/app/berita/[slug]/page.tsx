import { getOnePost } from "@/app/lib/pots";
import parse from 'html-react-parser';

export default async function Page({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const data = await getOnePost(slug);

    if (!data) {
        return <h1>Berita tidak ditemukan</h1>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4 pt-32 pb-16">
            <div>
                <h1 className="text-3xl font-bold mb-4 text-center">{data.title}</h1>
                <div className="flex items-center justify-center mt-2 mb-10 gap-2">
                    <h2 className="text-center font-semiBold text-gray-300 mr-4">Diselengarakan oleh:</h2>
                    <img
                        src={`/icon/${data.organisasi.image}.svg`}
                        alt="divisi"
                        className="w-8 h-8"
                    />
                    <div className="text-sm font-light">
                        <p>{data.organisasi.title}</p>
                        <p className="text-xs ">{new Date(data.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>
            </div>
            {data.bannerImage && (
                <img
                    src={`/posts/${data.bannerImage}`}
                    alt={data.title}
                    className="w-full h-auto rounded-lg mb-4"
                />
            )}
            <div className="text-justify mb-4">{parse(data.content)}</div>

        </div>
    );
}
