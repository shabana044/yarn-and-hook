"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

type OrderStatus = "pending" | "confirmed" | "making" | "completed" | "cancelled";

type Order = {
  id: string;
  customer_name: string;
  phone: string | null;
  instagram_handle: string | null;
  quantity: number;
  notes: string | null;
  status: OrderStatus;
  created_at: string;
  products: {
    name: string;
    price: number;
    image_url: string | null;
  } | null;
};

export default function MyOrdersPage() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMyOrders();
  }, []);

  async function loadMyOrders() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        customer_name,
        phone,
        instagram_handle,
        quantity,
        notes,
        status,
        created_at,
        products (
          name,
          price,
          image_url
        )
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setOrders((data || []) as unknown as Order[]);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
          My Orders
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Track your crochet orders
        </h1>

        <p className="mt-4 max-w-2xl leading-8 text-[#6b5a50]">
          View your submitted order requests and check the current order status.
        </p>

        {loading && (
          <p className="mt-8 leading-7 text-[#6b5a50]">Loading orders...</p>
        )}

        {!loading && !isLoggedIn && (
          <div className="mt-8 rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Please login first</h2>

            <p className="mt-3 leading-7 text-[#6b5a50]">
              You need to login to view your order requests.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-block rounded-full bg-[#7b4f35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
            >
              Login
            </Link>
          </div>
        )}

        {!loading && error && (
          <p className="mt-8 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && isLoggedIn && orders.length === 0 && (
          <div className="mt-8 rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">No orders yet</h2>

            <p className="mt-3 leading-7 text-[#6b5a50]">
              You have not placed any crochet order requests yet.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-[#7b4f35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
            >
              Browse Products
            </Link>
          </div>
        )}

        {!loading && isLoggedIn && orders.length > 0 && (
          <div className="mt-10 space-y-6">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm"
              >
                <div className="grid gap-6 md:grid-cols-[160px_1fr]">
                  <div className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-[#f3e4d4]">
                    {order.products?.image_url ? (
                      <img
                        src={order.products.image_url}
                        alt={order.products.name}
                        className="h-full w-full object-contain p-3"
                      />
                    ) : (
                      <span className="text-5xl">🧶</span>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                      <div>
                        <p className="text-sm font-medium text-[#a67c52]">
                          {new Date(order.created_at).toLocaleString()}
                        </p>

                        <h2 className="mt-2 text-2xl font-bold">
                          {order.products?.name || "Custom Order"}
                        </h2>

                        <p className="mt-1 text-[#6b5a50]">
                          Quantity: {order.quantity}
                        </p>
                      </div>

                      <p className="h-fit rounded-full bg-[#f3e4d4] px-4 py-2 text-sm font-semibold capitalize text-[#7b4f35]">
                        {order.status}
                      </p>
                    </div>

                    <div className="mt-5 rounded-2xl bg-[#fffaf3] p-4">
                      <p className="font-semibold">Notes</p>
                      <p className="mt-1 leading-7 text-[#6b5a50]">
                        {order.notes || "No notes added."}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}