import List from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { createClient } from "@/utils/supabase/server";

async function getBooks(work_id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("book")
    .select("book, book_id")
    .eq("work_id", work_id);

  if (error) throw error;
  return data ?? [];
}

export default async function Books({
  params,
}: {
  params: Promise<{ work_id: string }>;
}) {
  const { work_id } = await params;
  const workIdNum = Number(work_id);
  const books = await getBooks(workIdNum);
  const booksAsListItems: ListItem[] = books.map((book) => ({
    itemId: book.book_id,
    content: book.book,
  }));

  return <List items={booksAsListItems} prevUrl={`/works/${work_id}`} />;
}
