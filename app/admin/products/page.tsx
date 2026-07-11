"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
};

export default function AdminProductsPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    checkAdminAndLoadProducts();
  }, []);

  async function checkAdminAndLoadProducts() {
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
      await loadProducts();
    }

    setLoading(false);
  }

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      return;
    }

    setProducts(data || []);
  }

  async function handleAddProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    let uploadedImageUrl = "";

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      uploadedImageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("products").insert({
      name,
      description,
      price: Number(price),
      category,
      image_url: uploadedImageUrl,
      is_available: isAvailable,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Product added successfully.");

    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImageFile(null);
    setIsAvailable(true);

    await loadProducts();
  }
async function toggleProductAvailability(product: Product) {
  setMessage("");
  setError("");

  const { error } = await supabase
    .from("products")
    .update({ is_available: !product.is_available })
    .eq("id", product.id);

  if (error) {
    setError(error.message);
    return;
  }

  setMessage(
    product.is_available
      ? "Product hidden from website."
      : "Product shown on website."
  );

  await loadProducts();
}

async function deleteProduct(productId: string) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  setMessage("");
  setError("");

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    setError(error.message);
    return;
  }

  setMessage("Product deleted successfully.");
  await loadProducts();
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
          Admin Products
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Manage Products
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
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            <div className="rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">Add New Product</h2>

              <form onSubmit={handleAddProduct} className="mt-6 space-y-5">
                <div>
                  <label className="text-sm font-semibold">Product Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#ead8c7] px-4 py-3 outline-none focus:border-[#7b4f35]"
                    placeholder="Crochet Tote Bag"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="mt-2 min-h-28 w-full rounded-2xl border border-[#ead8c7] px-4 py-3 outline-none focus:border-[#7b4f35]"
                    placeholder="Short product details"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Price</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#ead8c7] px-4 py-3 outline-none focus:border-[#7b4f35]"
                    placeholder="499"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#ead8c7] px-4 py-3 outline-none focus:border-[#7b4f35]"
                    placeholder="Bags"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      setImageFile(file || null);
                    }}
                    className="mt-2 w-full rounded-2xl border border-[#ead8c7] bg-white px-4 py-3 outline-none focus:border-[#7b4f35]"
                  />

                  {imageFile && (
                    <p className="mt-2 text-sm text-[#6b5a50]">
                      Selected: {imageFile.name}
                    </p>
                  )}
                </div>

                <label className="flex items-center gap-3 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(event) => setIsAvailable(event.target.checked)}
                  />
                  Available on website
                </label>

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
                  Add Product
                </button>
              </form>
            </div>

            <div className="rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">Product List</h2>

              <div className="mt-6 space-y-4">
                {products.length === 0 && (
                  <p className="leading-7 text-[#6b5a50]">
                    No products added yet.
                  </p>
                )}

                {products.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-[#ead8c7] bg-[#fffaf3] p-5"
                  >
                    {product.image_url && (
                      <div className="mb-4 flex aspect-[4/5] w-full items-center justify-center rounded-2xl bg-[#f3e4d4]">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-full w-full object-contain p-3"
                        />
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="mt-1 text-sm text-[#6b5a50]">
                          {product.category || "No category"}
                        </p>
                      </div>

                      <p className="rounded-full bg-[#f3e4d4] px-3 py-1 text-sm font-semibold text-[#7b4f35]">
                        ₹{product.price}
                      </p>
                    </div>

                    <p className="mt-3 leading-7 text-[#6b5a50]">
                      {product.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
  <button
    type="button"
    onClick={() => toggleProductAvailability(product)}
    className="rounded-full border border-[#7b4f35] px-4 py-2 text-sm font-semibold text-[#7b4f35] transition hover:bg-[#f3e4d4]"
  >
    {product.is_available ? "Hide Product" : "Show Product"}
  </button>

  <button
    type="button"
    onClick={() => deleteProduct(product.id)}
    className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
  >
    Delete
  </button>
</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}