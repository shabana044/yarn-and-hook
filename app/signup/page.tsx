"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Account created successfully. You can now login.");
      setFullName("");
      setEmail("");
      setPassword("");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <section className="mx-auto max-w-md px-6 py-20">
        <div className="rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
            Create Account
          </p>

          <h1 className="mt-4 text-3xl font-bold">Sign up</h1>

          <p className="mt-3 leading-7 text-[#6b5a50]">
            Create an account to place crochet orders and manage your order
            details later.
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#ead8c7] px-4 py-3 outline-none focus:border-[#7b4f35]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#ead8c7] px-4 py-3 outline-none focus:border-[#7b4f35]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#ead8c7] px-4 py-3 outline-none focus:border-[#7b4f35]"
                placeholder="Minimum 6 characters"
              />
            </div>

            {message && (
              <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </p>
            )}

            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#7b4f35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6b5a50]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#7b4f35]">
              Login
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}