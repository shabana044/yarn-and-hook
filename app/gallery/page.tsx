import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const galleryItems = [
  {
    image: "/images/custom-colors.jpg",
    title: "Yarn Textures",
    description: "Soft yarn colors and textures used for handmade pieces.",
  },
  {
    image: "/images/crochet-bags.jpg",
    title: "Crochet Bags",
    description: "Handmade crochet bags for styling and gifting.",
  },
  {
    image: "/images/accessories.jpg",
    title: "Floral Details",
    description: "Cute crochet flowers and small decorative pieces.",
  },
  {
    image: "/images/wearables.jpg",
    title: "Cozy Wearables",
    description: "Soft scarves, beanies, and wearable crochet items.",
  },
  {
    image: "/images/gifting.jpg",
    title: "Gift Pieces",
    description: "Handmade pieces packed with care for special moments.",
  },
  {
    image: "/images/made-by-hand.jpg",
    title: "Custom Work",
    description: "Personalized crochet pieces based on customer ideas.",
  },
];

export const metadata = {
  title: "Gallery | Yarn & Hook Studio",
  description:
    "View handmade crochet gallery photos, yarn textures, crochet bags, accessories, gifts, and custom crochet work.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
            Gallery
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            A soft look into our handmade crochet world
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6b5a50]">
            This gallery gives a glimpse of yarn textures, crochet details,
            handmade products, custom orders, and cozy finished pieces.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {galleryItems.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-3xl border border-[#ead8c7] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-72 items-center justify-center bg-[#f3e4d4] text-6xl">
                <img
  src={item.image}
  alt={item.title}
  className="h-full w-full object-cover"
/>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold">{item.title}</h2>

                <p className="mt-3 leading-7 text-[#6b5a50]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}