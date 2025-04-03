import { Database, Tables } from "@/model/supabase";
import { createClient } from "./supabase/server";

type TableNames = keyof Database["public"]["Tables"];

export async function querySupabase<T extends TableNames, R extends Tables<T>>(
  tableName: T,
  columns: string,
  filter?: { column: string; value: any }
): Promise<R[]> {
  const supabase = await createClient();
  let query = supabase.from(tableName).select(columns);

  if (filter) {
    query = query.eq(filter.column, filter.value);
  }
  const { data, error } = await query;

  if (error) throw error;
  return (data ?? []) as R[];
}
