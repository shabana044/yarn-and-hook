import AuthLinks from "@/components/AuthLinks";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Custom Orders", href: "/custom-orders" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "My Orders", href: "/my-orders" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#ead8c7] bg-[#fffaf3]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-wide text-[#3b2f2f]">
          Yarn & Hook Studio
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-[#6b5a50] md:flex">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-[#7b4f35]">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <AuthLinks />

          <Link
            href="/contact"
            className="rounded-full bg-[#7b4f35] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
          >
            Order
          </Link>
        </div>

        <div className="md:hidden">
          <AuthLinks />
        </div>
      </nav>

      <div className="border-t border-[#ead8c7] px-6 py-3 md:hidden">
        <div className="flex gap-5 overflow-x-auto text-sm font-medium text-[#6b5a50]">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="shrink-0 hover:text-[#7b4f35]">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}