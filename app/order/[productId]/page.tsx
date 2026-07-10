"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  image_url: string | null;
};

export default function OrderPage() {
  const params = useParams();
  const productId = params.productId as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [notes, setNotes] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProductAndUser();
  }, []);

  async function loadProductAndUser() {
    setLoading(true);

    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("id, name, description, price, category, image_url")
      .eq("id", productId)
      .single();

    if (productError) {
      setError("Product not found.");
      setLoading(false);
      return;
    }

    setProduct(productData);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserId(user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      setCustomerName(profile?.full_name || user.user_metadata?.full_name || "");
    }

    setLoading(false);
  }

  async function handleOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!userId) {
      setError("Please login before placing an order.");
      return;
    }

    const { error } = await supabase.from("orders").insert({
      user_id: userId,
      product_id: productId,
      customer_name: customerName,
      phone,
      instagram_handle: instagramHandle,
      quantity: Number(quantity),
      notes,
      status: "pending",
    });

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Order request submitted successfully.");
    setPhone("");
    setInstagramHandle("");
    setQuantity("1");
    setNotes("");
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Link
          href="/products"
          className="text-sm font-semibold text-[#7b4f35] hover:underline"
        >
          ← Back to Products
        </Link>

        {loading && (
          <p className="mt-8 leading-7 text-[#6b5a50]">Loading order page...</p>
        )}

        {!loading && error && !product && (
          <div className="mt-8 rounded-3xl bg-red-50 p-8 text-red-600">
            {error}
          </div>
        )}

        {!loading && product && (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
                Order Product
              </p>

              <h1 className="mt-4 text-4xl font-bold md:text-5xl">
                {product.name}
              </h1>

              <p className="mt-4 text-xl font-bold text-[#7b4f35]">
                ₹{product.price}
              </p>

              <p className="mt-4 leading-8 text-[#6b5a50]">
                {product.description}
              </p>

              {product.image_url && (
                <div className="mt-8 flex aspect-[4/5] w-full items-center justify-center rounded-3xl bg-[#f3e4d4]">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-contain p-4"
                  />
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">Order Request</h2>

              {!userId && (
                <div className="mt-6 rounded-2xl bg-[#fffaf3] p-5">
                  <p className="leading-7 text-[#6b5a50]">
                    You need to login before placing an order.
                  </p>

                  <Link
                    href="/login"
                    className="mt-4 inline-block rounded-full bg-[#7b4f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
                  >
                    Login to Order
                  </Link>
                </div>
              )}

              {userId && (
                <form onSubmit={handleOrder} className="mt-6 space-y-5">
                  <div>
                    <label className="text-sm font-semibold">Your Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#ead8c7] px-4 py-3 outline-none focus:border-[#7b4f35]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#ead8c7] px-4 py-3 outline-none focus:border-[#7b4f35]"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">
                      Instagram ID
                    </label>
                    <input
                      type="text"
                      value={instagramHandle}
                      onChange={(event) =>
                        setInstagramHandle(event.target.value)
                      }
                      className="mt-2 w-full rounded-2xl border border-[#ead8c7] px-4 py-3 outline-none focus:border-[#7b4f35]"
                      placeholder="@yourusername"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Quantity</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={quantity}
                      onChange={(event) => setQuantity(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#ead8c7] px-4 py-3 outline-none focus:border-[#7b4f35]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">
                      Custom Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      className="mt-2 min-h-28 w-full rounded-2xl border border-[#ead8c7] px-4 py-3 outline-none focus:border-[#7b4f35]"
                      placeholder="Color, size, delivery details, or any custom request"
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
                    className="w-full rounded-full bg-[#7b4f35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
                  >
                    Submit Order Request
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}