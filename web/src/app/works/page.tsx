export const dynamic = "force-static";

import List from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { createClient } from "@/utils/supabase/server";

async function getWorks() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("work").select("work_id, work");

  if (error) throw error;
  return data ?? [];
}

export default async function Works() {
  const works = await getWorks();
  const worksAsListItems: ListItem[] = works.map((work) => ({
    itemId: work.work_id,
    content: work.work,
  }));

  return <List items={worksAsListItems} prevUrl={"/works"} />;
}
