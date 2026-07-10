"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserEmail(user.email ?? "");

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!error && profile?.role === "admin") {
        setIsAdmin(true);
      }

      setLoading(false);
    }

    checkAdmin();
  }, []);

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
          Admin
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Yarn & Hook Admin Dashboard
        </h1>

        {loading && (
          <p className="mt-6 leading-7 text-[#6b5a50]">
            Checking admin access...
          </p>
        )}

        {!loading && !userEmail && (
          <div className="mt-8 rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Please login first</h2>

            <p className="mt-3 leading-7 text-[#6b5a50]">
              You need to login before accessing the admin dashboard.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-block rounded-full bg-[#7b4f35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
            >
              Login
            </Link>
          </div>
        )}

        {!loading && userEmail && !isAdmin && (
          <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-red-700">Access denied</h2>

            <p className="mt-3 leading-7 text-red-600">
              This page is only for the Yarn & Hook Studio admin.
            </p>
          </div>
        )}

        {!loading && isAdmin && (
          <div className="mt-10">
            <p className="leading-7 text-[#6b5a50]">
              Logged in as <span className="font-semibold">{userEmail}</span>
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold">Manage Products</h2>

                <p className="mt-3 leading-7 text-[#6b5a50]">
                  Add, edit, hide, or delete crochet products from your website.
                </p>

                <Link
                  href="/admin/products"
                  className="mt-6 inline-block rounded-full bg-[#7b4f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
                >
                  Open Products
                </Link>
              </div>

              <div className="rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold">View Orders</h2>

                <p className="mt-3 leading-7 text-[#6b5a50]">
                  See customer order requests, phone numbers, notes, and order
                  status.
                </p>

                <p className="mt-6 text-sm font-semibold text-[#a67c52]">
                  Coming next
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}