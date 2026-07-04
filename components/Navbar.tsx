export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#ead8c7] bg-[#fffaf3]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-bold tracking-wide text-[#3b2f2f]">
          Yarn & Hook Studio
        </a>

        <div className="hidden items-center gap-6 text-sm font-medium text-[#6b5a50] md:flex">
          <a href="#collections" className="hover:text-[#7b4f35]">
            Collections
          </a>
          <a href="#custom-orders" className="hover:text-[#7b4f35]">
            Custom Orders
          </a>
          <a href="#gallery" className="hover:text-[#7b4f35]">
            Gallery
          </a>
          <a href="#blog" className="hover:text-[#7b4f35]">
            Blog
          </a>
          <a href="#contact" className="hover:text-[#7b4f35]">
            Contact
          </a>
        </div>

        <a
          href="#contact"
          className="rounded-full bg-[#7b4f35] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5f3c28]"
        >
          Order
        </a>
      </nav>
    </header>
  );
}