"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

type OrderStatus = "pending" | "confirmed" | "making" | "completed" | "cancelled";

type Order = {
  id: string;
  user_id: string;
  product_id: string | null;
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

const statusOptions: OrderStatus[] = [
  "pending",
  "confirmed",
  "making",
  "completed",
  "cancelled",
];

export default function AdminOrdersPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAdminAndLoadOrders();
  }, []);

  async function checkAdminAndLoadOrders() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === "admin") {
      setIsAdmin(true);
      await loadOrders();
    }

    setLoading(false);
  }

  async function loadOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        user_id,
        product_id,
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
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      return;
    }

setOrders((data || []) as unknown as Order[]);  }

  async function updateOrderStatus(orderId: string, status: OrderStatus) {
    setMessage("");
    setError("");

    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Order status updated.");
    await loadOrders();
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Link
          href="/admin"
          className="text-sm font-semibold text-[#7b4f35] hover:underline"
        >
          ← Back to Admin
        </Link>

        <p className="mt-8 text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
          Admin Orders
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Customer Orders
        </h1>

        {loading && (
          <p className="mt-6 leading-7 text-[#6b5a50]">
            Checking admin access...
          </p>
        )}

        {!loading && !isAdmin && (
          <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-red-700">Access denied</h2>

            <p className="mt-3 leading-7 text-red-600">
              This page is only for the Yarn & Hook Studio admin.
            </p>
          </div>
        )}

        {!loading && isAdmin && (
          <div className="mt-10">
            {message && (
              <p className="mb-6 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </p>
            )}

            {error && (
              <p className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {orders.length === 0 && (
              <div className="rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
                <p className="leading-7 text-[#6b5a50]">
                  No orders received yet.
                </p>
              </div>
            )}

            <div className="space-y-6">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm"
                >
                  <div className="grid gap-6 md:grid-cols-[180px_1fr]">
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

                        <div>
                          <label className="text-sm font-semibold">
                            Order Status
                          </label>

                          <select
                            value={order.status}
                            onChange={(event) =>
                              updateOrderStatus(
                                order.id,
                                event.target.value as OrderStatus
                              )
                            }
                            className="mt-2 w-full rounded-2xl border border-[#ead8c7] bg-white px-4 py-3 outline-none focus:border-[#7b4f35]"
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl bg-[#fffaf3] p-4">
                          <p className="font-semibold">Customer</p>
                          <p className="mt-1 text-[#6b5a50]">
                            {order.customer_name}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#fffaf3] p-4">
                          <p className="font-semibold">Phone</p>
                          <p className="mt-1 text-[#6b5a50]">
                            {order.phone || "Not provided"}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#fffaf3] p-4">
                          <p className="font-semibold">Instagram</p>
                          <p className="mt-1 text-[#6b5a50]">
                            {order.instagram_handle || "Not provided"}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#fffaf3] p-4">
                          <p className="font-semibold">Price</p>
                          <p className="mt-1 text-[#6b5a50]">
                            ₹{order.products?.price || 0}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl bg-[#fffaf3] p-4">
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
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}