import CreateForm from "./CreateForm";

export default function page() {

    return (
        <main className="container mx-auto p-4 my-16 flex flex-col items-center justify-center h-screen">
            <h2 className="text-4xl font-bold mb-4">Silahkan Buat Berita</h2>
            <CreateForm />
        </main>
    )
}