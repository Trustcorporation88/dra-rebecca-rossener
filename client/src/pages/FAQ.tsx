import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const faqCategories = [
  { key: "all", label: "Todas" },
  { key: "consulta", label: "Consulta" },
  { key: "procedimentos", label: "Procedimentos" },
  { key: "seguranca", label: "Segurança" },
  { key: "recuperacao", label: "Recuperação" },
  { key: "pagamento", label: "Pagamento" },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data: faqs = [], isLoading } = trpc.faqs.list.useQuery();

  const filtered = faqs.filter((f: any) => activeCategory === "all" || f.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 60%, #3d5a7a 100%)" }}>
        <div className="container">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(184,81,20,0.2)", color: "#d4713a", fontFamily: "'Onest', sans-serif" }}>
              Dúvidas Frequentes
            </div>
            <h1 className="text-white mb-4" style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1
            }}>
              Perguntas Frequentes
            </h1>
            <p className="text-white/70" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1.0625rem", lineHeight: 1.75 }}>
              Respondemos as principais dúvidas dos nossos pacientes sobre procedimentos, segurança, recuperação e muito mais.
            </p>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-6 bg-white border-b border-stone-100 sticky top-20 z-30">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {faqCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setOpenIndex(null); }}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "'Onest', sans-serif",
                  backgroundColor: activeCategory === cat.key ? "#2b3854" : "transparent",
                  color: activeCategory === cat.key ? "white" : "#2b3854",
                  border: `1.5px solid ${activeCategory === cat.key ? "#2b3854" : "#dfddd9"}`,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#f5f3ef" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 animate-pulse">
                    <div className="h-5 bg-stone-200 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#2b3854]/50" style={{ fontFamily: "'Noto Serif', serif" }}>Nenhuma pergunta nesta categoria.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((faq: any, i: number) => (
                  <div key={faq.id} className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm">
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-stone-50 transition-colors"
                    >
                      <span className="font-medium text-[#2b3854] pr-4" style={{ fontFamily: "'Onest', sans-serif", fontSize: "0.9375rem" }}>
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className="shrink-0 transition-transform duration-200"
                        style={{ color: "#b85114", transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>
                    {openIndex === i && (
                      <div className="px-6 pb-6 border-t border-stone-100">
                        <p className="text-[#2b3854]/70 leading-relaxed pt-4" style={{ fontFamily: "'Onest', sans-serif", fontSize: "0.9375rem" }}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Não encontrou resposta */}
            <div className="mt-12 p-8 rounded-2xl text-center" style={{ backgroundColor: "#2b3854" }}>
              <h3 className="text-white mb-3" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.375rem", fontWeight: 400 }}>
                Não encontrou sua resposta?
              </h3>
              <p className="text-white/65 mb-5 text-sm" style={{ fontFamily: "'Onest', sans-serif" }}>
                Entre em contato conosco ou agende uma consulta de avaliação.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contato">
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                    style={{ border: "1.5px solid rgba(255,255,255,0.4)", fontFamily: "'Onest', sans-serif", fontSize: "0.875rem" }}>
                    Fale Conosco
                  </span>
                </Link>
                <Link href="/agendamento">
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                    style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif", fontSize: "0.875rem" }}>
                    Agendar Consulta
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
