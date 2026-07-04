import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="border-t border-[#ead8c7] bg-[#fffaf3] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-sm text-[#6b5a50] md:flex-row">
        <p className="font-semibold text-[#3b2f2f]">{siteConfig.brandName}</p>

        <p>Handmade crochet pieces made with love and care.</p>

        <p>© 2026 {siteConfig.brandName}. All rights reserved.</p>
      </div>
    </footer>
  );
}