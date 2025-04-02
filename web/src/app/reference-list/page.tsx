export const dynamic = "force-static";

import { createClient } from "@/utils/supabase/server";

async function getWorks() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("work").select("work_id, work");

  if (error) throw error;
  return data ?? [];
}

export default async function ReferenceList() {
  const works = await getWorks();

  return (
    <>
      <div className="text-center">
        <p className="text-2xl font-bold">References</p>
      </div>
      <div className="mt-3 border-t border-t-gray-700">
        {works.map((work) => (
          <div
            className="flex w-full pr-10 justify-between align-middle"
            key={work.work_id}
          >
            <div className="w-9/10 py-5 pl-10 left-0 border-b border-b-gray-700">
              {work.work}
            </div>
            <div className="py-5">X</div>
          </div>
        ))}
      </div>
    </>
  );
}
