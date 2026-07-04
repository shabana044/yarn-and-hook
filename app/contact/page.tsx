import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Contact | Yarn & Hook Studio",
  description:
    "Contact Yarn & Hook Studio through WhatsApp or Instagram to discuss handmade crochet products and custom orders.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
          Contact Us
        </p>

        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
          Let’s create something handmade for you
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#6b5a50]">
          Have a crochet idea, custom gift request, or product question? Send us
          a message and we will help you with the details.
        </p>
      </section>

      <ContactSection />

      <Footer />
    </main>
  );
}