import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Custom Orders | Yarn & Hook Studio",
  description:
    "Place a custom handmade crochet order with Yarn & Hook Studio. Choose your product, color, size, and style.",
};

export default function CustomOrdersPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-[2rem] bg-[#f3e4d4] px-6 py-16 text-center md:px-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
            Custom Orders
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Get a crochet piece made specially for you
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#6b5a50]">
            Share your idea, color choice, size, or reference photo. We will
            discuss the details with you before confirming the order.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold text-[#a67c52]">01</p>
            <h2 className="mt-5 text-2xl font-bold">Send your idea</h2>
            <p className="mt-3 leading-7 text-[#6b5a50]">
              Message us with the product type, color preference, size, and any
              reference photo you have.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold text-[#a67c52]">02</p>
            <h2 className="mt-5 text-2xl font-bold">Discuss details</h2>
            <p className="mt-3 leading-7 text-[#6b5a50]">
              We will confirm the yarn, design possibility, price, and expected
              making time.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold text-[#a67c52]">03</p>
            <h2 className="mt-5 text-2xl font-bold">Order confirmation</h2>
            <p className="mt-3 leading-7 text-[#6b5a50]">
              Once everything is confirmed, your crochet piece will be handmade
              carefully and packed neatly.
            </p>
          </div>
        </div>

        <div className="mt-14 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold">Before placing a custom order</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-bold">Please share</h3>
              <ul className="mt-3 space-y-2 leading-7 text-[#6b5a50]">
                <li>Product type</li>
                <li>Color preference</li>
                <li>Size or measurement</li>
                <li>Reference photo, if available</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold">Please note</h3>
              <ul className="mt-3 space-y-2 leading-7 text-[#6b5a50]">
                <li>Making time depends on the design</li>
                <li>Exact colors depend on yarn availability</li>
                <li>Custom pieces may need advance booking</li>
                <li>Final price is confirmed after discussion</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </main>
  );
}