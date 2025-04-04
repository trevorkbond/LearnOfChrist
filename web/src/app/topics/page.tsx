export const dynamic = "force-static";

import List from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { createClient } from "@/utils/supabase/server";

async function getTopics() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("topic")
    .select("topic_id, topic");

  if (error) throw error;
  return data ?? [];
}

export default async function Topics() {
  const topics = await getTopics();
  const topicsAsListItems: ListItem[] = topics.map((topic) => ({
    itemId: topic.topic_id,
    content: topic.topic,
  }));

  return (
    <List
      items={topicsAsListItems}
      prevUrl={"/topics"}
      listTitle="Study by Topic"
    />
  );
}
