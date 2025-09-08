import { getAllPartisipants } from "@/app/lib/partisipant";
import RenderTable from "./RenderTable";

export default async function page() {
  const allPartisipants = await getAllPartisipants();

  return (
    <main className="container mx-auto p-4 my-16  flex flex-col items-center pt-20">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        Kelola Partisipan
      </h2>
      <p className="mb-6 font-light text-base md:text-lg text-gray-400 text-center">
        Ini adalah orang orang yang sudah vote
      </p>
      {/* Render Table  Partisipan */}
      <RenderTable allPartisipants={allPartisipants} />
    </main>
  );
}
