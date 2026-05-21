import { ArrowLeft, ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";

const categoryLabel: Record<string, string> = {
  facial: "Cirurgia Facial",
  corporal: "Cirurgia Corporal",
  pediatrica: "Cirurgia Pediátrica",
  vascular: "Anomalias Vasculares",
  "nao-cirurgico": "Procedimento Não-Cirúrgico",
};

export default function ProcedimentoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const { data: proc, isLoading } = trpc.procedures.bySlug.useQuery({ slug: slug ?? "" });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2b3854] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#2b3854]/60" style={{ fontFamily: "'Onest', sans-serif" }}>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!proc) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-[#2b3854] mb-4">Procedimento não encontrado</h2>
          <Link href="/procedimentos">
            <span className="text-[#b85114] hover:underline cursor-pointer" style={{ fontFamily: "'Onest', sans-serif" }}>
              ← Voltar para Procedimentos
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const indications = proc.indications ? JSON.parse(proc.indications) : [];
  const recovery_steps = proc.recovery_steps ? JSON.parse(proc.recovery_steps) : [];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 60%, #3d5a7a 100%)" }}>
        <div className="container">
          <Link href="/procedimentos">
            <span className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer mb-6 text-sm" style={{ fontFamily: "'Onest', sans-serif" }}>
              <ArrowLeft size={14} />
              Todos os Procedimentos
            </span>
          </Link>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ backgroundColor: "rgba(184,81,20,0.2)", color: "#d4713a", fontFamily: "'Onest', sans-serif" }}>
            {categoryLabel[proc.category] ?? proc.category}
          </div>
          <h1 className="text-white mb-4" style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 400,
            lineHeight: 1.1
          }}>
            {proc.name}
          </h1>
          <p className="text-white/70 max-w-2xl" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1.0625rem", lineHeight: 1.75 }}>
            {proc.short_description}
          </p>
          {proc.duration && (
            <div className="flex items-center gap-2 mt-5 text-white/60">
              <Clock size={14} />
              <span className="text-sm" style={{ fontFamily: "'Onest', sans-serif" }}>Duração estimada: {proc.duration}</span>
            </div>
          )}
        </div>
      </section>

      <div className="container py-16 md:py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Descrição */}
            {proc.description && (
              <div>
                <h2 className="mb-4" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: "#2b3854" }}>
                  Sobre o Procedimento
                </h2>
                <div className="text-[#2b3854]/70 leading-relaxed space-y-3" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1rem" }}>
                  {proc.description.split('\n').map((p: string, i: number) => p.trim() && <p key={i}>{p}</p>)}
                </div>
              </div>
            )}

            {/* Indicações */}
            {indications.length > 0 && (
              <div>
                <h2 className="mb-4" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: "#2b3854" }}>
                  Indicações
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {indications.map((ind: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: "#f5f3ef" }}>
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "#b85114" }} />
                      <span className="text-sm text-[#2b3854]/80" style={{ fontFamily: "'Onest', sans-serif" }}>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recuperação */}
            {recovery_steps.length > 0 && (
              <div>
                <h2 className="mb-4" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: "#2b3854" }}>
                  Pós-Operatório e Recuperação
                </h2>
                <div className="space-y-3">
                  {recovery_steps.map((step: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-100">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white" style={{ backgroundColor: "#2b3854" }}>
                        {i + 1}
                      </div>
                      <span className="text-sm text-[#2b3854]/75 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resultados */}
            {proc.results_info && (
              <div>
                <h2 className="mb-4" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: "#2b3854" }}>
                  Resultados Esperados
                </h2>
                <p className="text-[#2b3854]/70 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1rem" }}>
                  {proc.results_info}
                </p>
              </div>
            )}

            {/* Aviso ético */}
            <div className="flex gap-3 p-4 rounded-xl border" style={{ backgroundColor: "rgba(184,81,20,0.05)", borderColor: "rgba(184,81,20,0.2)" }}>
              <AlertCircle size={18} className="shrink-0 mt-0.5" style={{ color: "#b85114" }} />
              <p className="text-sm text-[#2b3854]/70 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
                <strong className="text-[#2b3854]">Importante:</strong> Toda indicação cirúrgica é feita exclusivamente após avaliação presencial individualizada. Os resultados podem variar de acordo com as características de cada paciente. A Dra. Rebecca Rossener irá orientar você sobre as expectativas reais para o seu caso.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* CTA Card */}
            <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #1c2840, #2b3854)" }}>
              <h3 className="mb-3" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.25rem", fontWeight: 400 }}>
                Agende sua consulta
              </h3>
              <p className="text-white/65 text-sm mb-5 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
                Tire suas dúvidas e descubra se este procedimento é indicado para você.
              </p>
              <Link href="/agendamento">
                <span className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif" }}>
                  Agendar Consulta
                  <ArrowRight size={14} />
                </span>
              </Link>
              <a
                href={`https://wa.me/5511999999999?text=Olá! Tenho interesse em saber mais sobre o procedimento de ${proc.name}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-medium text-white mt-3 transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: "1.5px solid rgba(255,255,255,0.3)", fontFamily: "'Onest', sans-serif", fontSize: "0.875rem" }}
              >
                Falar pelo WhatsApp
              </a>
            </div>

            {/* Info Card */}
            {(proc.anesthesia || proc.hospitalization) && (
              <div className="bg-white rounded-2xl p-5 border border-stone-100">
                <h4 className="mb-4 text-sm font-semibold text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>
                  Informações do Procedimento
                </h4>
                <div className="space-y-3">
                  {proc.anesthesia && (
                    <div className="flex justify-between items-center py-2 border-b border-stone-100">
                      <span className="text-xs text-[#2b3854]/60" style={{ fontFamily: "'Onest', sans-serif" }}>Anestesia</span>
                      <span className="text-xs font-medium text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>{proc.anesthesia}</span>
                    </div>
                  )}
                  {proc.hospitalization && (
                    <div className="flex justify-between items-center py-2 border-b border-stone-100">
                      <span className="text-xs text-[#2b3854]/60" style={{ fontFamily: "'Onest', sans-serif" }}>Internação</span>
                      <span className="text-xs font-medium text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>{proc.hospitalization}</span>
                    </div>
                  )}
                  {proc.duration && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-[#2b3854]/60" style={{ fontFamily: "'Onest', sans-serif" }}>Duração</span>
                      <span className="text-xs font-medium text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>{proc.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Outros procedimentos */}
            <div className="bg-white rounded-2xl p-5 border border-stone-100">
              <h4 className="mb-3 text-sm font-semibold text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>
                Ver todos os procedimentos
              </h4>
              <Link href="/procedimentos">
                <span className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
                  <ArrowLeft size={14} />
                  Voltar para a lista
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
