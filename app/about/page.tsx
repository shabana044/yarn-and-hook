import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "About | Yarn & Hook Studio",
  description:
    "Learn about Yarn & Hook Studio, a handmade crochet brand creating soft custom yarn pieces with care.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
              About Us
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Handmade crochet pieces with warmth, patience, and care.
            </h1>

            <p className="mt-6 leading-8 text-[#6b5a50]">
              Yarn & Hook Studio is a handmade crochet brand focused on creating
              soft, elegant, and meaningful yarn pieces. Every product is made
              with care, from choosing the yarn color to finishing the final
              stitch.
            </p>

            <p className="mt-4 leading-8 text-[#6b5a50]">
              Our pieces are suitable for gifting, styling, cozy everyday use,
              and custom orders. Whether it is a crochet bag, accessory, flower,
              wearable, or personalized gift, each item is made slowly and
              thoughtfully by hand.
            </p>
          </div>

          <div className="rounded-3xl bg-[#f3e4d4] p-8 shadow-sm">
  <div className="h-80 overflow-hidden rounded-3xl bg-[#ead8c7]">
    <img
      src="/images/made-by-hand.jpg"
      alt="Handmade crochet work"
      className="h-full w-full object-cover"
    />
  </div>
</div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Handmade</h2>
            <p className="mt-3 leading-7 text-[#6b5a50]">
              Every crochet piece is made by hand with attention to detail and
              finishing.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Customizable</h2>
            <p className="mt-3 leading-7 text-[#6b5a50]">
              Colors, sizes, and designs can be discussed based on your order
              idea.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Thoughtful</h2>
            <p className="mt-3 leading-7 text-[#6b5a50]">
              Our goal is to make pieces that feel personal, warm, and special.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}