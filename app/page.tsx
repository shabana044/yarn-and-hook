import CollectionCard from "@/components/CollectionCard";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/data/blogPosts";

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

      {/* Why Choose Us Section */}
     <section className="mx-auto max-w-6xl px-6 py-16">
  <div className="grid gap-6 md:grid-cols-3">
    <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 text-center shadow-sm">
      <div className="mx-auto h-28 w-28 overflow-hidden rounded-full bg-[#f3e4d4]">
        <img
          src="/images/made-by-hand.jpg"
          alt="Handmade crochet work"
          className="h-full w-full object-cover"
        />
      </div>

      <h2 className="mt-4 text-xl font-bold">Made by Hand</h2>
      <p className="mt-3 leading-7 text-[#6b5a50]">
        Every piece is slowly handmade with care, patience, and attention
        to small details.
      </p>
    </div>

    <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 text-center shadow-sm">
      <div className="mx-auto h-28 w-28 overflow-hidden rounded-full bg-[#f3e4d4]">
        <img
          src="/images/custom-colors.jpg"
          alt="Crochet yarn colors"
          className="h-full w-full object-cover"
        />
      </div>

      <h2 className="mt-4 text-xl font-bold">Custom Colors</h2>
      <p className="mt-3 leading-7 text-[#6b5a50]">
        Choose colors, sizes, and styles based on your personal taste or
        gifting idea.
      </p>
    </div>

    <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 text-center shadow-sm">
      <div className="mx-auto h-28 w-28 overflow-hidden rounded-full bg-[#f3e4d4]">
        <img
          src="/images/gifting.jpg"
          alt="Handmade crochet gift"
          className="h-full w-full object-cover"
        />
      </div>

      <h2 className="mt-4 text-xl font-bold">Perfect for Gifting</h2>
      <p className="mt-3 leading-7 text-[#6b5a50]">
        Handmade crochet pieces feel personal, thoughtful, warm, and
        special.
      </p>
    </div>
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
    <CollectionCard
      image="/images/crochet-bags.jpg"
      title="Crochet Bags"
      description="Stylish handmade bags for casual outings, college looks, and gifting."
    />

    <CollectionCard
      image="/images/accessories.jpg"
      title="Crochet Accessories"
      description="Cute bows, keychains, flowers, scrunchies, and small handmade details."
    />

    <CollectionCard
      image="/images/wearables.jpg"
      title="Cozy Wearables"
      description="Soft scarves, beanies, tops, and warm handmade pieces made to order."
    />
  </div>
</section>

      {/* Custom Orders Section */}
      <section id="custom-orders" className="bg-[#f3e4d4] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
              Custom Orders
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Made specially for you
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6b5a50]">
              Choose your product type, color, size, and style. We will discuss
              the details with you before confirming the order.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-[#a67c52]">01</p>
              <h3 className="mt-4 text-xl font-bold">Share your idea</h3>
              <p className="mt-3 leading-7 text-[#6b5a50]">
                Send the product idea, reference photo, color choice, or size
                requirement through WhatsApp or Instagram.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-[#a67c52]">02</p>
              <h3 className="mt-4 text-xl font-bold">Confirm details</h3>
              <p className="mt-3 leading-7 text-[#6b5a50]">
                We confirm the yarn type, price, expected making time, and any
                custom changes before starting the work.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-[#a67c52]">03</p>
              <h3 className="mt-4 text-xl font-bold">Handmade with care</h3>
              <p className="mt-3 leading-7 text-[#6b5a50]">
                Your piece is made carefully by hand and packed neatly before
                delivery or pickup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="mx-auto max-w-6xl px-6 py-20">
  <div className="text-center">
    <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
      Gallery
    </p>

    <h2 className="mt-4 text-3xl font-bold md:text-4xl">
      A little look into our handmade world
    </h2>

    <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6b5a50]">
      From yarn textures to finished crochet pieces, our gallery shows the
      softness, colors, and small handmade details behind every creation.
    </p>
  </div>

  <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
    <div className="h-64 overflow-hidden rounded-3xl bg-[#f3e4d4] shadow-sm">
      <img
        src="/images/custom-colors.jpg"
        alt="Yarn colors and textures"
        className="h-full w-full object-cover"
      />
    </div>

    <div className="h-64 overflow-hidden rounded-3xl bg-[#ead8c7] shadow-sm">
      <img
        src="/images/crochet-bags.jpg"
        alt="Crochet bag"
        className="h-full w-full object-cover"
      />
    </div>

    <div className="h-64 overflow-hidden rounded-3xl bg-[#f3e4d4] shadow-sm">
      <img
        src="/images/accessories.jpg"
        alt="Crochet accessories"
        className="h-full w-full object-cover"
      />
    </div>

    <div className="h-64 overflow-hidden rounded-3xl bg-[#ead8c7] shadow-sm">
      <img
        src="/images/wearables.jpg"
        alt="Crochet wearable"
        className="h-full w-full object-cover"
      />
    </div>

    <div className="h-64 overflow-hidden rounded-3xl bg-[#f3e4d4] shadow-sm">
      <img
        src="/images/gifting.jpg"
        alt="Crochet gift piece"
        className="h-full w-full object-cover"
      />
    </div>

    <div className="h-64 overflow-hidden rounded-3xl bg-[#ead8c7] shadow-sm">
      <img
        src="/images/made-by-hand.jpg"
        alt="Custom handmade crochet work"
        className="h-full w-full object-cover"
      />
    </div>
  </div>
</section>

      {/* Blog Section */}
      <section id="blog" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
              Blog
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Crochet stories, care tips, and gift ideas
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6b5a50]">
              Read simple guides about handmade crochet care, custom gift ideas,
              yarn colors, and styling inspiration.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-3xl border border-[#ead8c7] bg-[#fffaf3] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-medium text-[#a67c52]">
                  {post.date}
                </p>

                <h3 className="mt-4 text-xl font-bold">{post.title}</h3>

                <p className="mt-3 leading-7 text-[#6b5a50]">
                  {post.excerpt}
                </p>

                <a
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-block text-sm font-semibold text-[#7b4f35] hover:underline"
                >
                  Read More →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
            {/* FAQ Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Common questions before ordering
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6b5a50]">
            Here are a few things customers usually want to know before placing
            a handmade crochet order.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">Can I choose the color?</h3>
            <p className="mt-3 leading-7 text-[#6b5a50]">
              Yes. You can share your preferred color, and we will confirm based
              on yarn availability.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              How long does a custom order take?
            </h3>
            <p className="mt-3 leading-7 text-[#6b5a50]">
              Making time depends on the product size, design, yarn
              availability, and current order queue.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              Can I send a reference photo?
            </h3>
            <p className="mt-3 leading-7 text-[#6b5a50]">
              Yes. Reference photos are helpful. We will check if the design can
              be made in crochet before confirming.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">How do I place an order?</h3>
            <p className="mt-3 leading-7 text-[#6b5a50]">
              You can message through WhatsApp or Instagram with your product
              idea, color, size, and delivery details.
            </p>
          </div>
        </div>
      </section>
            <ContactSection />

      <Footer />
    </main>
  );
}