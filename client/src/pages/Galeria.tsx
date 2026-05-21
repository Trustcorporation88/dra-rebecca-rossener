import { useState } from "react";
import { AlertCircle, Eye } from "lucide-react";
import { trpc } from "@/lib/trpc";

const galleryCategories = [
  { key: "all", label: "Todos" },
  { key: "facial", label: "Facial" },
  { key: "corporal", label: "Corporal" },
  { key: "pediatrica", label: "Pediátrica" },
];

export default function Galeria() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const { data: items = [], isLoading } = trpc.gallery.all.useQuery(
    activeCategory !== "all" ? { category: activeCategory } : undefined
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 60%, #3d5a7a 100%)" }}>
        <div className="container">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(184,81,20,0.2)", color: "#d4713a", fontFamily: "'Onest', sans-serif" }}>
              Galeria
            </div>
            <h1 className="text-white mb-4" style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1
            }}>
              Resultados Antes e Depois
            </h1>
            <p className="text-white/70" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1.0625rem", lineHeight: 1.75 }}>
              Casos reais publicados com consentimento dos pacientes. Identidades preservadas para garantir privacidade e ética médica.
            </p>
          </div>
        </div>
      </section>

      {/* Aviso Ético */}
      {!consentAccepted && (
        <section className="py-16" style={{ backgroundColor: "#f5f3ef" }}>
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "rgba(184,81,20,0.1)" }}>
                  <Eye size={28} style={{ color: "#b85114" }} />
                </div>
                <h2 className="mb-4" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: "#2b3854" }}>
                  Aviso Importante
                </h2>
                <div className="text-left space-y-3 mb-6">
                  <div className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: "rgba(184,81,20,0.05)", border: "1px solid rgba(184,81,20,0.15)" }}>
                    <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#b85114" }} />
                    <p className="text-sm text-[#2b3854]/75 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
                      <strong className="text-[#2b3854]">Consentimento:</strong> Todas as imagens foram publicadas com consentimento expresso dos pacientes, conforme resolução CFM nº 1.974/2011.
                    </p>
                  </div>
                  <div className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: "rgba(43,56,84,0.05)", border: "1px solid rgba(43,56,84,0.1)" }}>
                    <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#2b3854" }} />
                    <p className="text-sm text-[#2b3854]/75 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
                      <strong className="text-[#2b3854]">Variação de resultados:</strong> Os resultados apresentados são individuais e podem variar de acordo com as características anatômicas, condições de saúde e cuidados pós-operatórios de cada paciente.
                    </p>
                  </div>
                  <div className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: "rgba(43,56,84,0.05)", border: "1px solid rgba(43,56,84,0.1)" }}>
                    <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#2b3854" }} />
                    <p className="text-sm text-[#2b3854]/75 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
                      <strong className="text-[#2b3854]">Privacidade:</strong> As identidades dos pacientes são preservadas. Nenhuma informação pessoal identificável é divulgada.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#2b3854]/60 mb-6" style={{ fontFamily: "'Onest', sans-serif" }}>
                  Ao continuar, você confirma que compreende que estas imagens são para fins informativos e educativos, e que os resultados individuais podem variar.
                </p>
                <button
                  onClick={() => setConsentAccepted(true)}
                  className="px-8 py-3.5 rounded-full font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: "#2b3854", fontFamily: "'Onest', sans-serif" }}
                >
                  Compreendo e desejo continuar
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Galeria */}
      {consentAccepted && (
        <>
          {/* Filtros */}
          <section className="py-6 bg-white border-b border-stone-100 sticky top-20 z-30">
            <div className="container">
              <div className="flex flex-wrap gap-2">
                {galleryCategories.map((cat) => (
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
            </div>
          </section>

          <section className="py-16 md:py-20" style={{ backgroundColor: "#f5f3ef" }}>
            <div className="container">
              {/* Aviso permanente */}
              <div className="flex gap-3 p-4 rounded-xl mb-8 max-w-3xl" style={{ backgroundColor: "rgba(184,81,20,0.05)", border: "1px solid rgba(184,81,20,0.15)" }}>
                <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#b85114" }} />
                <p className="text-xs text-[#2b3854]/70 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
                  Imagens publicadas com consentimento dos pacientes. Identidades preservadas. Os resultados podem variar individualmente. Esta galeria tem fins exclusivamente informativos.
                </p>
              </div>

              {isLoading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                      <div className="h-64 bg-stone-200" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-stone-200 rounded w-1/2" />
                        <div className="h-3 bg-stone-200 rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-[#2b3854]/50 text-lg" style={{ fontFamily: "'Noto Serif', serif" }}>
                    Nenhum caso disponível nesta categoria no momento.
                  </p>
                  <p className="text-sm text-[#2b3854]/40 mt-2" style={{ fontFamily: "'Onest', sans-serif" }}>
                    Novos casos são adicionados regularmente com consentimento dos pacientes.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item: any) => (
                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                      {/* Placeholder para imagem */}
                      <div className="h-64 flex flex-col items-center justify-center gap-3" style={{ backgroundColor: "#f5f3ef" }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(43,56,84,0.1)" }}>
                          <Eye size={20} style={{ color: "#2b3854" }} />
                        </div>
                        <p className="text-xs text-[#2b3854]/50 text-center px-4" style={{ fontFamily: "'Onest', sans-serif" }}>
                          Imagem disponível na consulta
                        </p>
                      </div>
                      <div className="p-4">
                        <p className="font-medium text-sm text-[#2b3854] mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>
                          {item.procedure_name}
                        </p>
                        {item.description && (
                          <p className="text-xs text-[#2b3854]/60 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
