import { siteConfig } from "@/data/siteConfig";

export default function FloatingWhatsApp() {
  const whatsappLink = `https://wa.me/${
    siteConfig.whatsappNumber
  }?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-[#25d366] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105"
      aria-label="Contact Yarn and Hook Studio on WhatsApp"
    >
      WhatsApp
    </a>
  );
}