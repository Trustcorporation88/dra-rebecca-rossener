import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456826156/HWKyL9jRA5Tm279iBWxhfp/logo-dra-rebecca_b1cfb4d1.jpg";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1c2840", color: "white" }}>
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={LOGO_URL}
                alt="Dra. Rebecca Rossener"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-white/20"
              />
              <div>
                <p className="font-serif text-base font-medium text-white" style={{ fontFamily: "'Noto Serif', serif" }}>
                  Dra. Rebecca Rossener
                </p>
                <p className="text-xs tracking-widest uppercase text-[#b85114]" style={{ fontFamily: "'Onest', sans-serif" }}>
                  Cirurgiã Plástica
                </p>
              </div>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-5" style={{ fontFamily: "'Onest', sans-serif" }}>
              Cirurgiã plástica formada pela USP, especialista em cirurgia reparadora, pediátrica e anomalias vasculares. Atendimento humanizado com excelência técnica.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/drarebeccarossener"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b85114")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com/drarebeccarossener"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b85114")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-base font-medium text-white mb-4" style={{ fontFamily: "'Noto Serif', serif" }}>
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Início", href: "/" },
                { label: "Sobre a Dra. Rebecca", href: "/sobre" },
                { label: "Procedimentos", href: "/procedimentos" },
                { label: "Jornada do Paciente", href: "/#jornada" },
                { label: "Blog", href: "/blog" },
                { label: "Galeria", href: "/galeria" },
                { label: "Contato", href: "/contato" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-sm text-white/60 hover:text-[#b85114] transition-colors cursor-pointer"
                      style={{ fontFamily: "'Onest', sans-serif" }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Procedimentos */}
          <div>
            <h4 className="font-serif text-base font-medium text-white mb-4" style={{ fontFamily: "'Noto Serif', serif" }}>
              Procedimentos
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Rinoplastia", href: "/procedimentos/rinoplastia" },
                { label: "Mamoplastia", href: "/procedimentos/mamoplastia-aumento" },
                { label: "Abdominoplastia", href: "/procedimentos/abdominoplastia" },
                { label: "Blefaroplastia", href: "/procedimentos/blefaroplastia" },
                { label: "Otoplastia Pediátrica", href: "/procedimentos/otoplastia-pediatrica" },
                { label: "Anomalias Vasculares", href: "/procedimentos/anomalias-vasculares" },
                { label: "Toxina Botulínica", href: "/procedimentos/toxina-botulinica" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-sm text-white/60 hover:text-[#b85114] transition-colors cursor-pointer"
                      style={{ fontFamily: "'Onest', sans-serif" }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-serif text-base font-medium text-white mb-4" style={{ fontFamily: "'Noto Serif', serif" }}>
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "#b85114" }} />
                <span className="text-sm text-white/65" style={{ fontFamily: "'Onest', sans-serif" }}>
                  Av. Paulista, 1000 — Cj. 101<br />
                  Bela Vista, São Paulo — SP<br />
                  CEP 01310-100
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={16} className="shrink-0" style={{ color: "#b85114" }} />
                <a
                  href="tel:+5511999999999"
                  className="text-sm text-white/65 hover:text-white transition-colors"
                  style={{ fontFamily: "'Onest', sans-serif" }}
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} className="shrink-0" style={{ color: "#b85114" }} />
                <a
                  href="mailto:contato@drarebeccarossener.com.br"
                  className="text-sm text-white/65 hover:text-white transition-colors"
                  style={{ fontFamily: "'Onest', sans-serif" }}
                >
                  contato@drarebeccarossener.com.br
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="mt-0.5 shrink-0" style={{ color: "#b85114" }} />
                <div className="text-sm text-white/65" style={{ fontFamily: "'Onest', sans-serif" }}>
                  <p>Seg — Sex: 8h às 18h</p>
                  <p>Sáb: 8h às 13h</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40" style={{ fontFamily: "'Onest', sans-serif" }}>
            © {new Date().getFullYear()} Dra. Rebecca Rossener — CRM/SP 000000 | RQE 00000. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/privacidade">
              <span className="text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer" style={{ fontFamily: "'Onest', sans-serif" }}>
                Política de Privacidade
              </span>
            </Link>
            <Link href="/termos">
              <span className="text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer" style={{ fontFamily: "'Onest', sans-serif" }}>
                Termos de Uso
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
