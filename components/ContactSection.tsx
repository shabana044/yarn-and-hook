import { siteConfig } from "@/data/siteConfig";

export default function ContactSection() {
  const whatsappLink = `https://wa.me/${
    siteConfig.whatsappNumber
  }?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <section id="contact" className="bg-[#f3e4d4] px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
            Contact
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Ready to order something handmade?
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-[#6b5a50]">
            Send us your product idea, reference photo, preferred color, size,
            and delivery details. We will reply with availability, price, and
            making time.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#7b4f35] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
            >
              Order on WhatsApp
            </a>

            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#7b4f35] px-6 py-3 text-center text-sm font-semibold text-[#7b4f35] transition hover:bg-[#fffaf3]"
            >
              Visit Instagram
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold">Order Details</h3>

          <div className="mt-6 space-y-5 text-[#6b5a50]">
            <div>
              <p className="font-semibold text-[#3b2f2f]">Custom Orders</p>
              <p className="mt-1">
                Available for bags, accessories, gifts, wearables, and selected
                crochet pieces.
              </p>
            </div>

            <div>
              <p className="font-semibold text-[#3b2f2f]">Making Time</p>
              <p className="mt-1">
                Depends on product size, design, yarn availability, and order
                queue.
              </p>
            </div>

            <div>
              <p className="font-semibold text-[#3b2f2f]">How to Contact</p>
              <p className="mt-1">
                Message through WhatsApp or Instagram for order discussion and
                confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}