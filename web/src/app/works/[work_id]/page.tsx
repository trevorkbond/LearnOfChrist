import List from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { querySupabase } from "@/utils/getItems";
import { createClient } from "@/utils/supabase/server";

async function getBooks(work_id: number) {
  return querySupabase("book", "book, book_id", {
    column: "work_id",
    value: work_id,
  });
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
