"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "making"
  | "completed"
  | "cancelled";

type PaymentStatus =
  | "not_requested"
  | "payment_requested"
  | "paid_submitted"
  | "verified"
  | "cancelled";

type Order = {
  id: string;
  quantity: number;
  notes: string | null;
  status: OrderStatus;
  created_at: string;
  payment_method: string | null;
  payment_status: PaymentStatus | null;
  final_price: number | null;
  advance_amount: number | null;
  payment_reference: string | null;
  admin_note: string | null;
  estimated_time: string | null;
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
  const [message, setMessage] = useState("");

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
        quantity,
        notes,
        status,
        created_at,
        payment_method,
        payment_status,
        final_price,
        advance_amount,
        payment_reference,
        admin_note,
        estimated_time,
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
      setLoading(false);
      return;
    }

    setOrders((data || []) as unknown as Order[]);
    setLoading(false);
  }

  async function submitPaymentReference(
    orderId: string,
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    const formData = new FormData(event.currentTarget);
    const referenceText = formData.get("payment_reference")?.toString().trim();

    if (!referenceText) {
      setError("Please enter your payment reference or transaction ID.");
      return;
    }

    const { error } = await supabase.rpc("submit_payment_reference", {
      order_id: orderId,
      reference_text: referenceText,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Payment reference submitted. Admin will verify it soon.");
    await loadMyOrders();
  }

  function formatText(value: string | null | undefined) {
    return value ? value.replaceAll("_", " ") : "Not provided";
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
          My Orders
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Track Your Crochet Orders
        </h1>

        <p className="mt-4 max-w-2xl leading-8 text-[#6b5a50]">
          Check your order status, final price, payment request, making time,
          and updates from Yarn & Hook Studio.
        </p>

        {message && (
          <p className="mt-8 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-8 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {loading && (
          <p className="mt-8 leading-7 text-[#6b5a50]">Loading orders...</p>
        )}

        {!loading && !isLoggedIn && (
          <div className="mt-10 rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Login required</h2>

            <p className="mt-3 leading-7 text-[#6b5a50]">
              Please login to view your orders.
            </p>

            <Link
              href="/login"
              className="mt-5 inline-block rounded-full bg-[#7b4f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
            >
              Login
            </Link>
          </div>
        )}

        {!loading && isLoggedIn && orders.length === 0 && (
          <div className="mt-10 rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">No orders yet</h2>

            <p className="mt-3 leading-7 text-[#6b5a50]">
              You have not placed any orders yet.
            </p>

            <Link
              href="/products"
              className="mt-5 inline-block rounded-full bg-[#7b4f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
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
                    <p className="text-sm font-medium text-[#a67c52]">
                      Ordered on {new Date(order.created_at).toLocaleString()}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">
                      {order.products?.name || "Custom Order"}
                    </h2>

                    <p className="mt-2 text-[#6b5a50]">
                      Quantity: {order.quantity}
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl bg-[#fffaf3] p-4">
                        <p className="font-semibold">Order Status</p>
                        <p className="mt-1 capitalize text-[#6b5a50]">
                          {formatText(order.status)}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#fffaf3] p-4">
                        <p className="font-semibold">Payment Status</p>
                        <p className="mt-1 capitalize text-[#6b5a50]">
                          {formatText(order.payment_status)}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#fffaf3] p-4">
                        <p className="font-semibold">Base Price</p>
                        <p className="mt-1 text-[#6b5a50]">
                          ₹{order.products?.price || 0}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#fffaf3] p-4">
                        <p className="font-semibold">Final Price</p>
                        <p className="mt-1 text-[#6b5a50]">
                          {order.final_price
                            ? `₹${order.final_price}`
                            : "Not confirmed yet"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#fffaf3] p-4">
                        <p className="font-semibold">Advance Amount</p>
                        <p className="mt-1 text-[#6b5a50]">
                          {order.advance_amount
                            ? `₹${order.advance_amount}`
                            : "Not requested yet"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#fffaf3] p-4">
                        <p className="font-semibold">Estimated Time</p>
                        <p className="mt-1 text-[#6b5a50]">
                          {order.estimated_time || "Not updated yet"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-[#fffaf3] p-4">
                      <p className="font-semibold">Message from Admin</p>
                      <p className="mt-1 leading-7 text-[#6b5a50]">
                        {order.admin_note || "No update from admin yet."}
                      </p>
                    </div>

                    {order.payment_reference && (
                      <div className="mt-4 rounded-2xl bg-[#fffaf3] p-4">
                        <p className="font-semibold">Your Payment Reference</p>
                        <p className="mt-1 leading-7 text-[#6b5a50]">
                          {order.payment_reference}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 rounded-2xl bg-[#fffaf3] p-4">
                      <p className="font-semibold">Your Notes</p>
                      <p className="mt-1 leading-7 text-[#6b5a50]">
                        {order.notes || "No notes added."}
                      </p>
                    </div>

                    {order.payment_status === "payment_requested" && (
                      <form
                        onSubmit={(event) =>
                          submitPaymentReference(order.id, event)
                        }
                        className="mt-4 rounded-2xl border border-[#ead8c7] bg-[#fff4df] p-4"
                      >
                        <p className="font-semibold text-[#7b4f35]">
                          Payment requested
                        </p>

                        <p className="mt-2 leading-7 text-[#6b5a50]">
                          Your order is confirmed. Complete the payment through
                          the method discussed with Yarn & Hook Studio, then
                          enter your UPI reference or transaction ID below.
                        </p>

                        <input
                          name="payment_reference"
                          type="text"
                          required
                          placeholder="Enter UPI reference / transaction ID"
                          className="mt-4 w-full rounded-2xl border border-[#ead8c7] bg-white px-4 py-3 outline-none focus:border-[#7b4f35]"
                        />

                        <button
                          type="submit"
                          className="mt-4 rounded-full bg-[#7b4f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
                        >
                          Submit Payment Reference
                        </button>
                      </form>
                    )}

                    {order.payment_status === "paid_submitted" && (
                      <div className="mt-4 rounded-2xl border border-[#ead8c7] bg-[#fff4df] p-4">
                        <p className="font-semibold text-[#7b4f35]">
                          Payment submitted
                        </p>

                        <p className="mt-2 leading-7 text-[#6b5a50]">
                          Your payment reference has been submitted. Admin will
                          verify it soon.
                        </p>
                      </div>
                    )}

                    {order.payment_status === "verified" && (
                      <div className="mt-4 rounded-2xl border border-green-100 bg-green-50 p-4">
                        <p className="font-semibold text-green-700">
                          Payment verified
                        </p>

                        <p className="mt-2 leading-7 text-green-700">
                          Your payment has been verified. Your order will move
                          forward according to the order status.
                        </p>
                      </div>
                    )}
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