export const dynamic = "force-static";

import List from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { querySupabase } from "@/utils/getItems";

async function getWorks() {
  return querySupabase("work", "work_id, work");
}

export default async function Works() {
  const works = await getWorks();
  const worksAsListItems: ListItem[] = works.map((work) => ({
    itemId: work.work_id,
    content: work.work,
  }));

  return <List items={worksAsListItems} prevUrl={"/works"} />;
}
