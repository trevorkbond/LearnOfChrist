import List from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { createClient } from "@/utils/supabase/server";

async function getReferences(book_id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reference")
    .select("reference_id, chapter, start_verse, end_verse")
    .eq("book_id", book_id);

  if (error) throw error;
  return data ?? [];
}

async function getWorkTitle(book_id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("book")
    .select("book")
    .eq("book_id", book_id);

  if (error) throw error;
  return data[0]?.book;
}

export default async function References({
  params,
}: {
  params: Promise<{ book_id: string; work_id: string }>;
}) {
  const { book_id, work_id } = await params;
  const bookIdNum = Number(book_id);
  const bookTitle = await getWorkTitle(bookIdNum);
  const references = await getReferences(bookIdNum);
  const referencesAsListItems: ListItem[] = references.map((reference) => ({
    itemId: reference.reference_id,
    content: `${reference.chapter}:${reference.start_verse}${
      reference.end_verse !== reference.start_verse
        ? `-${reference.end_verse}`
        : ""
    }`,
  }));

  return (
    <List
      items={referencesAsListItems}
      prevUrl={`/works/${work_id}/${book_id}`}
      listTitle={bookTitle!}
    />
  );
}
