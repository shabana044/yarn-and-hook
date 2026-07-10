import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";

export const metadata = {
  title: "Products | Yarn & Hook Studio",
  description:
    "Explore handmade crochet bags, accessories, wearables, gifts, home decor, and custom crochet collections from Yarn & Hook Studio.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-[2rem] bg-[#f3e4d4] px-6 py-16 text-center md:px-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
            Products
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Browse handmade crochet pieces
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#6b5a50]">
            These products are managed from the admin dashboard. Every piece is
            handmade slowly with care, so colors, sizes, and designs can be
            discussed before placing an order.
          </p>
        </div>

        <ProductList />
      </section>

      <Footer />
    </main>
  );
}