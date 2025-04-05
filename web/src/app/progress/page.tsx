import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  async function getNumRead() {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("user_reference")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    return count;
  }

  const numRead = await getNumRead();

  return (
    <>
      <div className="text-center">
        <p className="text-2xl font-bold">Progress</p>
      </div>
      <div className="px-10">
        <p className="text-xl mt-8">By Reference</p>
        <p className="mt-4">
          You have read {numRead!} of 1658 unique references
        </p>
      </div>
    </>
  );
}
