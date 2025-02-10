import Form  from "../Form";

export default function page() {
    return (
        <main className="container mx-auto p-4 my-16 flex flex-col items-center pt-20">
            <h2 className="text-4xl font-bold mb-4">Buat Baru</h2>
            <Form />
        </main>
    )
}