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
  user_id: string;
  product_id: string | null;
  customer_name: string;
  phone: string | null;
  instagram_handle: string | null;
  quantity: number;
  notes: string | null;
  status: OrderStatus;
  created_at: string;

  address_line: string | null;
  city: string | null;
  district: string | null;
  pincode: string | null;
  landmark: string | null;
  delivery_method: string | null;
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

const statusOptions: OrderStatus[] = [
  "pending",
  "confirmed",
  "making",
  "completed",
  "cancelled",
];

const paymentStatusOptions: PaymentStatus[] = [
  "not_requested",
  "payment_requested",
  "paid_submitted",
  "verified",
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
        address_line,
        city,
        district,
        pincode,
        landmark,
        delivery_method,
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
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      return;
    }

    setOrders((data || []) as unknown as Order[]);
  }

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

  async function updatePaymentStatus(
    orderId: string,
    paymentStatus: PaymentStatus
  ) {
    setMessage("");
    setError("");

    const { error } = await supabase
      .from("orders")
      .update({ payment_status: paymentStatus })
      .eq("id", orderId);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Payment status updated.");
    await loadOrders();
  }
async function updateOrderDetails(
  orderId: string,
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  setMessage("");
  setError("");

  const formData = new FormData(event.currentTarget);

  const finalPrice = formData.get("final_price")?.toString().trim();
  const advanceAmount = formData.get("advance_amount")?.toString().trim();
  const estimatedTime = formData.get("estimated_time")?.toString().trim();
  const adminNote = formData.get("admin_note")?.toString().trim();
  const paymentReference = formData
    .get("payment_reference")
    ?.toString()
    .trim();

  const { error } = await supabase
    .from("orders")
    .update({
      final_price: finalPrice ? Number(finalPrice) : null,
      advance_amount: advanceAmount ? Number(advanceAmount) : null,
      estimated_time: estimatedTime || null,
      admin_note: adminNote || null,
      payment_reference: paymentReference || null,
    })
    .eq("id", orderId);

  if (error) {
    setError(error.message);
    return;
  }

  setMessage("Order price and admin details updated.");
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

                        <div className="grid gap-4 sm:grid-cols-2">
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

                          <div>
                            <label className="text-sm font-semibold">
                              Payment Status
                            </label>

                            <select
                              value={order.payment_status || "not_requested"}
                              onChange={(event) =>
                                updatePaymentStatus(
                                  order.id,
                                  event.target.value as PaymentStatus
                                )
                              }
                              className="mt-2 w-full rounded-2xl border border-[#ead8c7] bg-white px-4 py-3 outline-none focus:border-[#7b4f35]"
                            >
                              {paymentStatusOptions.map((status) => (
                                <option key={status} value={status}>
                                  {status.replaceAll("_", " ")}
                                </option>
                              ))}
                            </select>
                          </div>
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
                          <p className="font-semibold">Base Price</p>
                          <p className="mt-1 text-[#6b5a50]">
                            ₹{order.products?.price || 0}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl bg-[#fffaf3] p-4">
                          <p className="font-semibold">Delivery Method</p>
                          <p className="mt-1 capitalize text-[#6b5a50]">
                            {order.delivery_method || "Not provided"}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#fffaf3] p-4">
                          <p className="font-semibold">Payment Method</p>
                          <p className="mt-1 capitalize text-[#6b5a50]">
                            {(order.payment_method || "Not provided").replaceAll(
                              "_",
                              " "
                            )}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#fffaf3] p-4">
                          <p className="font-semibold">Payment Status</p>
                          <p className="mt-1 capitalize text-[#6b5a50]">
                            {(order.payment_status || "not_requested").replaceAll(
                              "_",
                              " "
                            )}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#fffaf3] p-4">
                          <p className="font-semibold">Pincode</p>
                          <p className="mt-1 text-[#6b5a50]">
                            {order.pincode || "Not provided"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl bg-[#fffaf3] p-4">
                        <p className="font-semibold">Address</p>
                        <p className="mt-1 leading-7 text-[#6b5a50]">
                          {[
                            order.address_line,
                            order.city,
                            order.district,
                            order.landmark,
                          ]
                            .filter(Boolean)
                            .join(", ") || "Not provided"}
                        </p>
                      </div>

<form
  onSubmit={(event) => updateOrderDetails(order.id, event)}
  className="mt-4 rounded-2xl bg-[#fffaf3] p-4"
>
  <p className="font-semibold">Final Price & Admin Details</p>

  <div className="mt-4 grid gap-4 md:grid-cols-2">
    <div>
      <label className="text-sm font-semibold">Final Price</label>
      <input
        name="final_price"
        type="number"
        min="0"
        step="1"
        defaultValue={order.final_price || ""}
        placeholder="Final confirmed price"
        className="mt-2 w-full rounded-2xl border border-[#ead8c7] bg-white px-4 py-3 outline-none focus:border-[#7b4f35]"
      />
    </div>

    <div>
      <label className="text-sm font-semibold">Advance Amount</label>
      <input
        name="advance_amount"
        type="number"
        min="0"
        step="1"
        defaultValue={order.advance_amount || ""}
        placeholder="Advance payment needed"
        className="mt-2 w-full rounded-2xl border border-[#ead8c7] bg-white px-4 py-3 outline-none focus:border-[#7b4f35]"
      />
    </div>

    <div>
      <label className="text-sm font-semibold">Estimated Time</label>
      <input
        name="estimated_time"
        type="text"
        defaultValue={order.estimated_time || ""}
        placeholder="Example: 5-7 days"
        className="mt-2 w-full rounded-2xl border border-[#ead8c7] bg-white px-4 py-3 outline-none focus:border-[#7b4f35]"
      />
    </div>

    <div>
      <label className="text-sm font-semibold">Payment Reference</label>
      <input
        name="payment_reference"
        type="text"
        defaultValue={order.payment_reference || ""}
        placeholder="UPI ref / transaction id"
        className="mt-2 w-full rounded-2xl border border-[#ead8c7] bg-white px-4 py-3 outline-none focus:border-[#7b4f35]"
      />
    </div>
  </div>

  <div className="mt-4">
    <label className="text-sm font-semibold">Admin Note</label>
    <textarea
      name="admin_note"
      defaultValue={order.admin_note || ""}
      placeholder="Example: Yarn available. Please pay advance to confirm."
      className="mt-2 min-h-24 w-full rounded-2xl border border-[#ead8c7] bg-white px-4 py-3 outline-none focus:border-[#7b4f35]"
    />
  </div>

  <button
    type="submit"
    className="mt-4 rounded-full bg-[#7b4f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
  >
    Save Order Details
  </button>
</form>
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