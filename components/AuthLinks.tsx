"use client";

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthLinks() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(!!user);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    window.location.href = "/";
  }

  if (isLoggedIn) {
    return (
      <button
        onClick={handleLogout}
        className="rounded-full border border-[#7b4f35] px-4 py-2 text-sm font-semibold text-[#7b4f35] transition hover:bg-[#f3e4d4]"
      >
        Logout
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="text-sm font-semibold text-[#6b5a50] hover:text-[#7b4f35]"
      >
        Login
      </Link>

      <Link
        href="/signup"
        className="rounded-full border border-[#7b4f35] px-4 py-2 text-sm font-semibold text-[#7b4f35] transition hover:bg-[#f3e4d4]"
      >
        Sign up
      </Link>
    </div>
  );
}