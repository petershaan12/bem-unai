import { getOnePost } from "@/app/lib/pots";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const data = await getOnePost(id);

    if (!data) {
        return <h1>Berita tidak ditemukan</h1>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
            {data.bannerImage && (
                <img 
                    src={data.bannerImage} 
                    alt={data.title} 
                    className="w-full h-auto rounded-lg mb-4"
                />
            )}
            <p className="text-gray-700 mb-4">{data.content}</p>
            <p className="text-sm text-gray-500">Diselenggarakan oleh: {data.orgnizer}</p>
        </div>
    );
}
