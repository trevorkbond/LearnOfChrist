"use server";

import { Tables } from "@/model/supabase";
import { createClient } from "@/utils/supabase/server";

export async function getWorks(): Promise<Tables<"work">[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("work").select("*");

  if (error) {
    throw error;
  }

  return data ?? [];
}
