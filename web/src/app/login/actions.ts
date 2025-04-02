"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import {
  AuthResponse,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { AuthResult } from "./page";

export async function login(formData: FormData): Promise<AuthResult | void> {
  const supabase = await createClient();
  return await doAuthOperation(formData, (data) =>
    supabase.auth.signInWithPassword(data)
  );
}

export async function signup(formData: FormData): Promise<AuthResult | void> {
  const supabase = await createClient();
  return await doAuthOperation(formData, (data) => supabase.auth.signUp(data));
}

async function doAuthOperation(
  formData: FormData,
  authOperation: (
    credentials: SignUpWithPasswordCredentials
  ) => Promise<AuthResponse>
): Promise<AuthResult | void> {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await authOperation(data);

  if (error) {
    return {
      success: false,
      message: error.message || "Authentication failed",
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
