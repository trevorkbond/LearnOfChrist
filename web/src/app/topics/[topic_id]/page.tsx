import List from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { querySupabase } from "@/utils/getItems";

async function getReferences(topic_id: number) {
  return querySupabase("book", "book, book_id", {
    column: "work_id",
    value: topic_id,
  });
}

export default async function References({
  params,
}: {
  params: Promise<{ topic_id: string }>;
}) {
  const { topic_id } = await params;
  const topicIdNum = Number(topic_id);
  const references = await getReferences(topicIdNum);
  const referencesAsListItems: ListItem[] = references.map((reference) => ({
    itemId: reference.book_id,
    content: reference.book,
  }));

  return (
    <List
      items={referencesAsListItems}
      prevUrl={`/topics/${topic_id}`}
      listTitle="Study by Topic"
    />
  );
}
