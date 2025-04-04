import { createClient } from "@/utils/supabase/server";
import Scripture, { ScriptureItem } from "@/components/Scripture/Scripture";

async function getScriptures(reference_id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reference_scripture")
    .select("scripture (scripture_id, content)")
    .eq("reference_id", reference_id);

  if (error) throw error;
  return data ?? [];
}

async function getReference(reference_id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reference")
    .select("chapter, start_verse, end_verse")
    .eq("reference_id", reference_id);

  if (error) throw error;
  return data[0] ?? [];
}

async function getTopics(reference_id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reference_topic")
    .select("topic (topic_id, topic)")
    .eq("reference_id", reference_id);

  if (error) throw error;
  return data ?? [];
}

async function getBookTitle(book_id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("book")
    .select("book")
    .eq("book_id", book_id);

  if (error) throw error;
  return data[0]?.book;
}

export default async function Scriptures({
  params,
}: {
  params: Promise<{ reference_id: string; book_id: string; work_id: string }>;
}) {
  const { reference_id, book_id } = await params;
  const referenceIdNum = Number(reference_id);
  const bookIdNum = Number(book_id);
  const bookTitle = await getBookTitle(bookIdNum);
  const reference = await getReference(referenceIdNum);
  const scriptures = await getScriptures(referenceIdNum);
  const topics = await getTopics(referenceIdNum);
  const concatenatedTopics = topics.map((t) => t.topic.topic).join("; ");
  const scripturesAsItems: ScriptureItem[] = [];

  let index = 0;
  for (let i = reference.start_verse!; i < reference.end_verse! + 1; i++) {
    scripturesAsItems.push({
      verse: i,
      content: scriptures[index].scripture.content!,
      id: scriptures[index].scripture.scripture_id,
    });
    index++;
  }

  return (
    <>
      <div className="text-center">
        <p className="text-2xl font-bold">
          {bookTitle} {reference.chapter}:{reference.start_verse}
          {reference.end_verse !== reference.start_verse
            ? `-${reference.end_verse}`
            : ""}
        </p>
      </div>
      <div className="flex flex-col items-center px-10">
        {scripturesAsItems.map((scripture) => (
          <div className="py-5 text-left" key={scripture.id}>
            <Scripture
              verse={scripture.verse}
              content={scripture.content}
              id={scripture.id}
            />
          </div>
        ))}
        <div className="py-5 self-start">{`Topics: ${concatenatedTopics}`}</div>
      </div>
    </>
  );
}
