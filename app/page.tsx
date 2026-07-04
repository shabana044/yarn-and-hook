import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
          Handmade Crochet Studio
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Soft handmade crochet pieces made with love and care.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6b5a50]">
          Yarn & Hook Studio creates warm, elegant, and custom handmade crochet
          products for gifting, styling, and everyday comfort.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="#collections"
            className="rounded-full bg-[#7b4f35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
          >
            View Collections
          </a>

          <a
            href="#contact"
            className="rounded-full border border-[#7b4f35] px-6 py-3 text-sm font-semibold text-[#7b4f35] transition hover:bg-[#f3e4d4]"
          >
            Order on WhatsApp
          </a>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
            Our Collections
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Handmade pieces for every cozy moment
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6b5a50]">
            Explore soft crochet creations designed for gifting, styling, and
            personal comfort. Each piece can be customized based on color, size,
            and yarn preference.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-48 items-center justify-center rounded-2xl bg-[#f3e4d4] text-5xl">
              🧶
            </div>

            <h3 className="text-xl font-bold">Crochet Bags</h3>

            <p className="mt-3 leading-7 text-[#6b5a50]">
              Stylish handmade bags for casual outings, college looks, and
              gifting.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-48 items-center justify-center rounded-2xl bg-[#f3e4d4] text-5xl">
              🌸
            </div>

            <h3 className="text-xl font-bold">Crochet Accessories</h3>

            <p className="mt-3 leading-7 text-[#6b5a50]">
              Cute bows, keychains, flowers, scrunchies, and small handmade
              details.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-48 items-center justify-center rounded-2xl bg-[#f3e4d4] text-5xl">
              🧣
            </div>

            <h3 className="text-xl font-bold">Cozy Wearables</h3>

            <p className="mt-3 leading-7 text-[#6b5a50]">
              Soft scarves, beanies, tops, and warm handmade pieces made to
              order.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
