import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const categories = [
  { key: "all", label: "Todos" },
  { key: "facial", label: "Facial" },
  { key: "corporal", label: "Corporal" },
  { key: "pediatrica", label: "Pediátrica" },
  { key: "vascular", label: "Anomalias Vasculares" },
  { key: "nao-cirurgico", label: "Não-Cirúrgico" },
];

const categoryStyle: Record<string, { bg: string; text: string }> = {
  facial: { bg: "rgba(97,127,186,0.12)", text: "#617fba" },
  corporal: { bg: "rgba(43,56,84,0.1)", text: "#2b3854" },
  pediatrica: { bg: "rgba(184,81,20,0.1)", text: "#b85114" },
  vascular: { bg: "rgba(86,63,54,0.1)", text: "#563f36" },
  "nao-cirurgico": { bg: "rgba(97,127,186,0.12)", text: "#617fba" },
};

export default function Procedimentos() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const { data: procedures = [], isLoading } = trpc.procedures.all.useQuery();

  const filtered = procedures.filter((p: any) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.short_description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 60%, #3d5a7a 100%)" }}>
        <div className="container">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(184,81,20,0.2)", color: "#d4713a", fontFamily: "'Onest', sans-serif" }}>
              Especialidades
            </div>
            <h1 className="text-white mb-4" style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1
            }}>
              Procedimentos
            </h1>
            <p className="text-white/70" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1.0625rem", lineHeight: 1.75 }}>
              Cada procedimento é planejado de forma individualizada, com técnicas modernas, segurança e resultados naturais.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros e Busca */}
      <section className="py-8 bg-white border-b border-stone-100 sticky top-20 z-30">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Categorias */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
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
            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2b3854]/40" />
              <input
                type="text"
                placeholder="Buscar procedimento..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-full text-sm border border-stone-200 focus:outline-none focus:border-[#2b3854] transition-colors"
                style={{ fontFamily: "'Onest', sans-serif", backgroundColor: "#f5f3ef" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Procedimentos */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#f5f3ef" }}>
        <div className="container">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-5 bg-stone-200 rounded mb-3 w-24" />
                  <div className="h-6 bg-stone-200 rounded mb-3 w-3/4" />
                  <div className="h-4 bg-stone-200 rounded mb-2" />
                  <div className="h-4 bg-stone-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#2b3854]/50 text-lg" style={{ fontFamily: "'Noto Serif', serif" }}>Nenhum procedimento encontrado.</p>
              <button onClick={() => { setActiveCategory("all"); setSearch(""); }} className="mt-4 text-sm text-[#b85114] hover:underline" style={{ fontFamily: "'Onest', sans-serif" }}>
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((proc: any) => {
                const cat = categoryStyle[proc.category] ?? categoryStyle.facial;
                return (
                  <Link key={proc.id} href={`/procedimentos/${proc.slug}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group border border-transparent hover:border-stone-200">
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: cat.bg, color: cat.text, fontFamily: "'Onest', sans-serif" }}>
                          {categories.find(c => c.key === proc.category)?.label ?? proc.category}
                        </span>
                        <ArrowRight size={16} className="text-[#2b3854]/30 group-hover:text-[#b85114] transition-colors" />
                      </div>
                      <h3 className="mb-2 group-hover:text-[#b85114] transition-colors" style={{
                        fontFamily: "'Noto Serif', serif",
                        fontSize: "1.125rem",
                        fontWeight: 500,
                        color: "#2b3854"
                      }}>
                        {proc.name}
                      </h3>
                      <p className="text-sm text-[#2b3854]/60 line-clamp-3" style={{ fontFamily: "'Onest', sans-serif", lineHeight: 1.65 }}>
                        {proc.short_description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: "#2b3854" }}>
        <div className="container text-center">
          <h2 className="text-white mb-4" style={{ fontFamily: "'Noto Serif', serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400 }}>
            Não sabe qual procedimento é ideal para você?
          </h2>
          <p className="text-white/65 mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Onest', sans-serif" }}>
            Agende uma consulta de avaliação. A Dra. Rebecca irá analisar seu caso individualmente e indicar o melhor caminho.
          </p>
          <Link href="/agendamento">
            <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif", boxShadow: "0 8px 24px rgba(184,81,20,0.4)" }}>
              Agendar Consulta de Avaliação
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
