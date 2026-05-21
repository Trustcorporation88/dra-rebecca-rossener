import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456826156/HWKyL9jRA5Tm279iBWxhfp/logo-dra-rebecca_b1cfb4d1.jpg";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Procedimentos", href: "/procedimentos" },
  { label: "Blog", href: "/blog" },
  { label: "Galeria", href: "/galeria" },
  { label: "Contato", href: "/contato" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHome = location === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img
                src={LOGO_URL}
                alt="Dra. Rebecca Rossener"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-white/20 group-hover:ring-white/40 transition-all"
              />
              <div className="hidden sm:block">
                <p
                  className={`font-serif text-sm font-medium leading-tight transition-colors ${
                    transparent ? "text-white" : "text-navy"
                  }`}
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Dra. Rebecca Rossener
                </p>
                <p
                  className={`text-xs font-sans tracking-widest uppercase transition-colors ${
                    transparent ? "text-white/70" : "text-[#b85114]"
                  }`}
                >
                  Cirurgiã Plástica
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    location === link.href
                      ? transparent
                        ? "bg-white/20 text-white"
                        : "bg-[#2b3854]/10 text-[#2b3854]"
                      : transparent
                      ? "text-white/85 hover:text-white hover:bg-white/10"
                      : "text-[#2b3854]/80 hover:text-[#2b3854] hover:bg-[#2b3854]/5"
                  }`}
                  style={{ fontFamily: "'Onest', sans-serif" }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma consulta com a Dra. Rebecca Rossener."
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                transparent
                  ? "bg-[#b85114] text-white hover:bg-[#8f3e0f]"
                  : "bg-[#b85114] text-white hover:bg-[#8f3e0f]"
              }`}
              style={{ fontFamily: "'Onest', sans-serif" }}
            >
              <Phone size={14} />
              Agendar Consulta
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                transparent
                  ? "text-white hover:bg-white/10"
                  : "text-[#2b3854] hover:bg-[#2b3854]/5"
              }`}
              aria-label="Abrir menu de navegação"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-stone-100 px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    location === link.href
                      ? "bg-[#2b3854]/10 text-[#2b3854]"
                      : "text-[#2b3854]/80 hover:bg-[#2b3854]/5"
                  }`}
                  style={{ fontFamily: "'Onest', sans-serif" }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma consulta com a Dra. Rebecca Rossener."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#b85114] text-white text-sm font-medium"
              style={{ fontFamily: "'Onest', sans-serif" }}
            >
              <Phone size={14} />
              Agendar Consulta
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
