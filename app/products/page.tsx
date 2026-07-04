import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const productCategories = [
  {
    icon: "👜",
    title: "Crochet Bags",
    description:
      "Handmade bags for casual outings, college looks, gifts, and everyday styling.",
    bestFor: "College, casual wear, gifting",
    orderType: "Custom colors available",
  },
  {
    icon: "🌸",
    title: "Crochet Accessories",
    description:
      "Small handmade pieces like bows, flowers, keychains, scrunchies, and bookmarks.",
    bestFor: "Cute gifts and daily use",
    orderType: "Made in small batches",
  },
  {
    icon: "🧣",
    title: "Cozy Wearables",
    description:
      "Soft scarves, beanies, tops, and warm crochet pieces made with comfort in mind.",
    bestFor: "Winter, styling, cozy looks",
    orderType: "Size-based custom order",
  },
  {
    icon: "🎁",
    title: "Gift Sets",
    description:
      "Thoughtful handmade crochet pieces arranged as simple personalized gift sets.",
    bestFor: "Birthdays and surprises",
    orderType: "Pre-order recommended",
  },
  {
    icon: "🏡",
    title: "Home Decor",
    description:
      "Crochet coasters, small table pieces, and soft handmade details for your room.",
    bestFor: "Room decor and gifting",
    orderType: "Custom theme available",
  },
  {
    icon: "✨",
    title: "Custom Crochet",
    description:
      "A special piece made from your idea, reference photo, color choice, or size.",
    bestFor: "Personalized orders",
    orderType: "Discuss before confirming",
  },
];

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
            Browse handmade crochet pieces by category
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#6b5a50]">
            These are not mass-produced products. Every piece is handmade slowly
            with care, so colors, sizes, and designs can be discussed before
            placing an order.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {productCategories.map((category) => (
            <article
              key={category.title}
              className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f3e4d4] text-4xl">
                  {category.icon}
                </div>

                <div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>

                  <p className="mt-3 leading-7 text-[#6b5a50]">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 rounded-2xl bg-[#fffaf3] p-5 text-sm text-[#6b5a50] sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-[#3b2f2f]">Best for</p>
                  <p className="mt-1">{category.bestFor}</p>
                </div>

                <div>
                  <p className="font-semibold text-[#3b2f2f]">Order type</p>
                  <p className="mt-1">{category.orderType}</p>
                </div>
              </div>

              <a
                href="/#contact"
                className="mt-6 inline-block rounded-full bg-[#7b4f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
              >
                Ask about this
              </a>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}