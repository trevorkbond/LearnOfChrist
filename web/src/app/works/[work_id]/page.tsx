import List from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { createClient } from "@/utils/supabase/server";

async function getBooks(work_id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_referenced_books", {
    work_id_param: work_id,
  });

  if (error) throw error;
  return data ?? [];
}

async function getWorkTitle(work_id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("work")
    .select("work")
    .eq("work_id", work_id);

  if (error) throw error;
  return data[0]?.work;
}

// tell nextjs to statically generate pages for works 0 - 4
export async function generateStaticParams() {
  return Array.from({ length: 5 }, (_, i) => ({
    work_id: i.toString(),
  }));
}

export default async function Books({
  params,
}: {
  params: Promise<{ work_id: string }>;
}) {
  const { work_id } = await params;
  const workIdNum = Number(work_id);
  const workTitle = await getWorkTitle(workIdNum);
  const books = await getBooks(workIdNum);
  const booksAsListItems: ListItem[] = books.map((book) => ({
    itemId: book.book_id,
    content: book.book,
  }));

  return (
    <List
      items={booksAsListItems}
      prevUrl={`/works/${work_id}`}
      listTitle={workTitle!}
    />
  );
}
