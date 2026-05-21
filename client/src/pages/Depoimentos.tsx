import { AlertCircle, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function Depoimentos() {
  const { data: testimonials = [], isLoading } = trpc.testimonials.all.useQuery();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 60%, #3d5a7a 100%)" }}>
        <div className="container">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(184,81,20,0.2)", color: "#d4713a", fontFamily: "'Onest', sans-serif" }}>
              Depoimentos
            </div>
            <h1 className="text-white mb-4" style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1
            }}>
              O que dizem nossos pacientes
            </h1>
            <p className="text-white/70" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1.0625rem", lineHeight: 1.75 }}>
              Relatos reais de pacientes publicados com consentimento. Identidades preservadas para garantir privacidade e ética médica.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ backgroundColor: "#f5f3ef" }}>
        <div className="container">
          {/* Aviso ético */}
          <div className="flex gap-3 p-4 rounded-xl mb-10 max-w-3xl" style={{ backgroundColor: "rgba(184,81,20,0.05)", border: "1px solid rgba(184,81,20,0.15)" }}>
            <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#b85114" }} />
            <p className="text-xs text-[#2b3854]/70 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
              <strong className="text-[#2b3854]">Aviso ético:</strong> Todos os depoimentos foram publicados com consentimento expresso dos pacientes. Identidades preservadas. Os resultados individuais podem variar. Estes relatos têm fins informativos e não constituem garantia de resultados.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => <div key={j} className="w-4 h-4 bg-stone-200 rounded" />)}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-stone-200 rounded" />
                    <div className="h-4 bg-stone-200 rounded w-4/5" />
                    <div className="h-4 bg-stone-200 rounded w-3/5" />
                  </div>
                  <div className="h-3 bg-stone-200 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#2b3854]/50 text-lg" style={{ fontFamily: "'Noto Serif', serif" }}>
                Nenhum depoimento disponível no momento.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t: any) => (
                <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < (t.rating ?? 5) ? "#b85114" : "transparent"}
                        style={{ color: i < (t.rating ?? 5) ? "#b85114" : "#dfddd9" }}
                      />
                    ))}
                  </div>

                  {/* Depoimento */}
                  <p className="text-[#2b3854]/75 leading-relaxed mb-5 text-sm" style={{ fontFamily: "'Onest', sans-serif", lineHeight: 1.75 }}>
                    "{t.content}"
                  </p>

                  {/* Paciente */}
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: "#2b3854" }}>
                      {t.patient_alias?.charAt(0) ?? "P"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>
                        {t.patient_alias}
                      </p>
                      {t.procedure_name && (
                        <p className="text-xs text-[#2b3854]/50" style={{ fontFamily: "'Onest', sans-serif" }}>
                          {t.procedure_name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 p-8 rounded-3xl text-center" style={{ background: "linear-gradient(135deg, #1c2840, #2b3854)" }}>
            <h3 className="text-white mb-3" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400 }}>
              Pronto para começar sua jornada?
            </h3>
            <p className="text-white/65 mb-6 text-sm max-w-lg mx-auto" style={{ fontFamily: "'Onest', sans-serif" }}>
              Agende uma consulta de avaliação e descubra como a Dra. Rebecca pode ajudar você.
            </p>
            <Link href="/agendamento">
              <span className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif" }}>
                Agendar Consulta
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
