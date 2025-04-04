// import List from "@/components/List/List";
// import { ListItem } from "@/components/List/ListItem";
// import { createClient } from "@/utils/supabase/server";

// async function getReferences(topic_id: number) {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from("reference_topic")
//     .select("reference_id, topic_id, reference (reference_id, chapter)")
//     .eq("topic_id", topic_id);

//   if (error) throw error;
//   return data ?? [];
// }

// export default async function References({
//   params,
// }: {
//   params: Promise<{ topic_id: string }>;
// }) {
//   const { topic_id } = await params;
//   const topicIdNum = Number(topic_id);
//   const topics = await getReferences(topicIdNum);
//   const topicsAsListItems: ListItem[] = topics.map((topic) => ({
//     itemId: topic.book_id,
//     content: topic.book,
//   }));

//   return (
//     <List
//       items={topicsAsListItems}
//       prevUrl={`/topics/${topic_id}`}
//       listTitle="Study by Topic"
//     />
//   );
// }

export default function References() {
  return <h1>hi</h1>;
}
