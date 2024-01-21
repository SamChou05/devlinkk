"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import type { SignupInput } from "./signup/page";
import type { LoginInput } from "./login/page";
import { ActiveType } from "@/types/types";

const supabase = createClient(cookies());
const origin = headers().get("origin");

export const signUp = async (data: SignupInput) => {
  "use server";

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        active: ActiveType.NONE,
        investor: false,
        founder: false,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return {
      error: error.message,
    };
  }
};

export const signIn = async (data: LoginInput) => {
  "use server";

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) {
    return {
      error: error.message,
    };
  }
};
