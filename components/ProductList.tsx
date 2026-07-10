"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  image_url: string | null;
  is_available: boolean;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <p className="mt-12 text-center leading-7 text-[#6b5a50]">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-12 rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-red-600">
        {error}
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="mt-12 text-center leading-7 text-[#6b5a50]">
        No products added yet. Please check again later.
      </p>
    );
  }

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {products.map((product) => (
        <article
          key={product.id}
          className="overflow-hidden rounded-3xl border border-[#ead8c7] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          {product.image_url ? (
  <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#f3e4d4]">
    <img
      src={product.image_url}
      alt={product.name}
      className="h-full w-full object-contain p-4"
    />
  </div>
) : (
  <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#f3e4d4] text-6xl">
    🧶
  </div>
)}

          <div className="p-6">
            <p className="text-sm font-medium text-[#a67c52]">
              {product.category || "Crochet"}
            </p>

            <h2 className="mt-3 text-2xl font-bold">{product.name}</h2>

            <p className="mt-3 leading-7 text-[#6b5a50]">
              {product.description}
            </p>

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-xl font-bold text-[#7b4f35]">
                ₹{product.price}
              </p>

              <a
  href={`/order/${product.id}`}
  className="rounded-full bg-[#7b4f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
>
  Order
</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}