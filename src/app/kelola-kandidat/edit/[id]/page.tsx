import Form from "../../Form";
import { redirect } from "next/navigation";
import { getOneCandidateById } from "@/app/lib/candidate";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getOneCandidateById(id);

  if (!data) {
    redirect("/404");
  }

  return (
    <main className="container mx-auto p-4 my-16 flex flex-col items-center pt-20">
      <h2 className="text-4xl font-bold mb-4">Edit</h2>
      <Form prevData={data} />
    </main>
  );
}
