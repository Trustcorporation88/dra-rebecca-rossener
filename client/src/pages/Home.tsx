import { Link } from "wouter";
import { ArrowRight, Award, Shield, Heart, Star, ChevronDown, CheckCircle2, Quote } from "lucide-react";
import { trpc } from "@/lib/trpc";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456826156/HWKyL9jRA5Tm279iBWxhfp/logo-dra-rebecca_b1cfb4d1.jpg";

// Ninfeia SVG decorativo
function NinfeiaSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 160 C100 160 60 130 60 90 C60 60 80 40 100 40 C120 40 140 60 140 90 C140 130 100 160 100 160Z" fill="currentColor" opacity="0.15"/>
      <path d="M100 160 C100 160 40 120 50 80 C58 50 80 45 100 60 C120 45 142 50 150 80 C160 120 100 160 100 160Z" fill="currentColor" opacity="0.12"/>
      <path d="M100 160 C100 160 20 110 40 70 C55 40 85 50 100 75 C115 50 145 40 160 70 C180 110 100 160 100 160Z" fill="currentColor" opacity="0.08"/>
      <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.3"/>
      <path d="M100 160 L95 185 M100 160 L100 190 M100 160 L105 185" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
    </svg>
  );
}

// Seção Hero
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 55%, #3d5a7a 100%)" }}
    >
      {/* Decorações orgânicas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <NinfeiaSVG className="absolute -top-20 -right-20 w-96 h-96 text-white opacity-5 rotate-12" />
        <NinfeiaSVG className="absolute bottom-10 -left-20 w-80 h-80 text-white opacity-5 -rotate-12" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-5" style={{ background: "#617fba", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full opacity-8" style={{ background: "#b85114", filter: "blur(50px)" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-3" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <Award size={14} style={{ color: "#b85114" }} />
              <span className="text-xs font-medium text-white/80 tracking-widest uppercase" style={{ fontFamily: "'Onest', sans-serif" }}>
                Formada pela USP · Membro SBCP
              </span>
            </div>

            <h1 className="text-white mb-6" style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em"
            }}>
              Cirurgia Plástica com{" "}
              <em style={{ color: "#b85114", fontStyle: "italic" }}>Excelência</em>{" "}
              e Cuidado Humano
            </h1>

            <p className="text-white/70 mb-8 max-w-lg" style={{
              fontFamily: "'Onest', sans-serif",
              fontSize: "1.0625rem",
              lineHeight: 1.75
            }}>
              Especialista em cirurgia reparadora, pediátrica e anomalias vasculares.
              Resultados naturais, atendimento acolhedor e segurança em cada etapa da sua jornada.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/agendamento">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif", boxShadow: "0 8px 24px rgba(184,81,20,0.35)" }}>
                  Agendar Consulta
                  <ArrowRight size={16} />
                </span>
              </Link>
              <Link href="/procedimentos">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                  style={{ border: "1.5px solid rgba(255,255,255,0.4)", fontFamily: "'Onest', sans-serif" }}>
                  Ver Procedimentos
                </span>
              </Link>
            </div>

            {/* Credenciais */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: <Award size={18} />, text: "Formada pela USP" },
                { icon: <Shield size={18} />, text: "Membro SBCP" },
                { icon: <Heart size={18} />, text: "Especialista Pediátrica" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span style={{ color: "#b85114" }}>{item.icon}</span>
                  <span className="text-white/70 text-sm" style={{ fontFamily: "'Onest', sans-serif" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Logo / Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden ring-4 ring-white/15 shadow-2xl">
                <img
                  src={LOGO_URL}
                  alt="Dra. Rebecca Rossener - Cirurgia Plástica"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-xs font-medium text-[#2b3854]/60 mb-0.5" style={{ fontFamily: "'Onest', sans-serif" }}>Especialidades</p>
                <p className="text-sm font-semibold text-[#2b3854]" style={{ fontFamily: "'Noto Serif', serif" }}>Reparadora · Pediátrica</p>
              </div>
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-[#b85114] rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-xs font-medium text-white/70 mb-0.5" style={{ fontFamily: "'Onest', sans-serif" }}>Formação</p>
                <p className="text-sm font-bold text-white" style={{ fontFamily: "'Noto Serif', serif" }}>USP São Paulo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-white/40 tracking-widest uppercase" style={{ fontFamily: "'Onest', sans-serif" }}>Saiba mais</span>
        <ChevronDown size={18} className="text-white/40" />
      </div>
    </section>
  );
}

// Seção de números/credenciais
function CredentialsSection() {
  const stats = [
    { number: "USP", label: "Faculdade de Medicina", desc: "Uma das melhores do mundo" },
    { number: "SBCP", label: "Membro Titular", desc: "Sociedade Brasileira de Cirurgia Plástica" },
    { number: "3+", label: "Especialidades", desc: "Estética · Reparadora · Pediátrica" },
    { number: "100%", label: "Ética e Transparência", desc: "Indicações honestas e seguras" },
  ];

  return (
    <section style={{ backgroundColor: "#f5f3ef" }} className="py-14">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold mb-1" style={{ fontFamily: "'Noto Serif', serif", color: "#b85114" }}>
                {stat.number}
              </p>
              <p className="text-sm font-semibold text-[#2b3854] mb-1" style={{ fontFamily: "'Onest', sans-serif" }}>
                {stat.label}
              </p>
              <p className="text-xs text-[#2b3854]/60 hidden md:block" style={{ fontFamily: "'Onest', sans-serif" }}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Seção Sobre (resumida)
function AboutPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-[#2b3854] to-[#3d5a7a] flex items-center justify-center">
              <NinfeiaSVG className="w-64 h-64 text-white" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={LOGO_URL} alt="Dra. Rebecca Rossener" className="w-48 h-48 rounded-full object-cover ring-4 ring-white/20" />
              </div>
            </div>
            {/* Valores cards */}
            <div className="absolute -right-4 top-8 bg-white rounded-2xl p-4 shadow-lg max-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <Heart size={16} style={{ color: "#b85114" }} />
                <span className="text-xs font-semibold text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>Valores</span>
              </div>
              {["Honestidade", "Acolhimento", "Ética", "Respeito"].map(v => (
                <div key={v} className="flex items-center gap-1.5 mb-1">
                  <CheckCircle2 size={11} style={{ color: "#b85114" }} />
                  <span className="text-xs text-[#2b3854]/70" style={{ fontFamily: "'Onest', sans-serif" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ backgroundColor: "rgba(184,81,20,0.1)", color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
              Sobre a Médica
            </div>
            <h2 className="mb-5" style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              fontWeight: 400,
              color: "#2b3854",
              lineHeight: 1.2
            }}>
              Uma trajetória marcada pela{" "}
              <em style={{ color: "#b85114", fontStyle: "italic" }}>dedicação</em>{" "}
              e pelo cuidado
            </h2>
            <p className="text-[#2b3854]/70 mb-5 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1rem" }}>
              Formada pela Faculdade de Medicina da USP, a Dra. Rebecca Rossener entrou na medicina com apenas 16 anos, sendo a primeira da família. Sua trajetória é marcada por expedições cirúrgicas em regiões remotas do Brasil, pelo amor à cirurgia pediátrica e por um propósito claro: fazer a diferença na vida de cada paciente.
            </p>
            <p className="text-[#2b3854]/70 mb-8 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1rem" }}>
              Especialista em cirurgia reparadora, pediátrica e anomalias vasculares, ela combina excelência técnica com um atendimento genuinamente humano e acolhedor.
            </p>
            <Link href="/sobre">
              <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "#2b3854", fontFamily: "'Onest', sans-serif" }}>
                Conheça minha história
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Seção Procedimentos
function ProceduresSection() {
  const { data: procedures } = trpc.procedures.featured.useQuery();

  const categoryColors: Record<string, { bg: string; text: string; label: string }> = {
    facial: { bg: "rgba(97,127,186,0.12)", text: "#617fba", label: "Facial" },
    corporal: { bg: "rgba(43,56,84,0.1)", text: "#2b3854", label: "Corporal" },
    pediatrica: { bg: "rgba(184,81,20,0.1)", text: "#b85114", label: "Pediátrica" },
    vascular: { bg: "rgba(86,63,54,0.1)", text: "#563f36", label: "Vascular" },
    "nao-cirurgico": { bg: "rgba(97,127,186,0.12)", text: "#617fba", label: "Não-Cirúrgico" },
  };

  return (
    <section className="section-padding" style={{ backgroundColor: "#f5f3ef" }}>
      <div className="container">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ backgroundColor: "rgba(184,81,20,0.1)", color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
            Especialidades
          </div>
          <h2 className="mb-4" style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
            fontWeight: 400,
            color: "#2b3854",
            lineHeight: 1.2
          }}>
            Procedimentos com Excelência e Naturalidade
          </h2>
          <p className="text-[#2b3854]/65 max-w-2xl mx-auto" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1rem" }}>
              Cada procedimento é planejado de forma individualizada, respeitando sua anatomia, seus objetivos e sua segurança.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {(procedures ?? []).slice(0, 6).map((proc) => {
            const cat = categoryColors[proc.category] ?? categoryColors.facial;
            return (
              <Link key={proc.id} href={`/procedimentos/${proc.slug}`}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group border border-transparent hover:border-[#dfddd9]">
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: cat.bg, color: cat.text, fontFamily: "'Onest', sans-serif" }}>
                      {cat.label}
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

        <div className="text-center">
          <Link href="/procedimentos">
            <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
              style={{ border: "1.5px solid #2b3854", color: "#2b3854", fontFamily: "'Onest', sans-serif" }}>
              Ver todos os procedimentos
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Seção Jornada do Paciente
function PatientJourneySection() {
  const steps = [
    {
      number: "01",
      title: "Consulta Inicial",
      desc: "Escuta ativa, avaliação personalizada e planejamento cirúrgico individualizado. Sem pressão para decisão imediata.",
    },
    {
      number: "02",
      title: "Planejamento Cirúrgico",
      desc: "Definição detalhada do procedimento, orientações pré-operatórias e esclarecimento de todas as dúvidas.",
    },
    {
      number: "03",
      title: "Procedimento",
      desc: "Cirurgia realizada com técnica precisa, em ambiente hospitalar seguro, com equipe qualificada.",
    },
    {
      number: "04",
      title: "Pós-Operatório",
      desc: "Acompanhamento próximo e personalizado em cada etapa da recuperação, com suporte contínuo.",
    },
    {
      number: "05",
      title: "Resultado & Bem-Estar",
      desc: "Acompanhamento de longo prazo para garantir resultados duradouros e sua satisfação plena.",
    },
  ];

  return (
    <section id="jornada" className="section-padding" style={{ backgroundColor: "#2b3854" }}>
      <div className="container">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ backgroundColor: "rgba(184,81,20,0.2)", color: "#d4713a", fontFamily: "'Onest', sans-serif" }}>
            Sua Jornada
          </div>
          <h2 className="mb-4 text-white" style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
            fontWeight: 400,
            lineHeight: 1.2
          }}>
            Do primeiro contato ao resultado final
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1rem" }}>
              Acompanhamento completo e humanizado em cada etapa da sua transformação.
          </p>
        </div>

        <div className="relative">
          {/* Linha conectora */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 opacity-20" style={{ backgroundColor: "#b85114" }} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"
                  style={{ backgroundColor: i === 2 ? "#b85114" : "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.15)" }}>
                  <span className="font-bold text-white text-sm" style={{ fontFamily: "'Onest', sans-serif" }}>{step.number}</span>
                </div>
                <h3 className="text-white font-medium mb-2" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1rem" }}>
                  {step.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/agendamento">
            <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif", boxShadow: "0 8px 24px rgba(184,81,20,0.35)" }}>
              Iniciar Minha Jornada
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Seção Depoimentos
function TestimonialsSection() {
  const { data: testimonials } = trpc.testimonials.featured.useQuery();

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ backgroundColor: "rgba(184,81,20,0.1)", color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
            Depoimentos
          </div>
          <h2 className="mb-4" style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
            fontWeight: 400,
            color: "#2b3854",
            lineHeight: 1.2
          }}>
            Histórias de transformação e confiança
          </h2>
          <p className="text-[#2b3854]/60 text-xs max-w-lg mx-auto" style={{ fontFamily: "'Onest', sans-serif" }}>
              Depoimentos publicados com consentimento dos pacientes. Identidades preservadas para garantir privacidade e ética médica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(testimonials ?? []).map((t) => (
            <div key={t.id} className="rounded-2xl p-6 border border-[#dfddd9] hover:shadow-md transition-shadow">
              <Quote size={28} style={{ color: "#b85114", opacity: 0.4 }} className="mb-4" />
              <p className="text-[#2b3854]/75 mb-5 leading-relaxed italic" style={{ fontFamily: "'Noto Serif', serif", fontSize: "0.9375rem" }}>
                "{t.content}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>{t.patient_alias}</p>
                  {t.procedure_name && (
                    <p className="text-xs text-[#b85114]" style={{ fontFamily: "'Onest', sans-serif" }}>{t.procedure_name}</p>
                  )}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} fill="#b85114" stroke="none" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Seção FAQ Preview
function FAQPreview() {
  const { data: faqs } = trpc.faqs.list.useQuery();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const previewFaqs = (faqs ?? []).slice(0, 5);

  return (
    <section className="section-padding" style={{ backgroundColor: "#f5f3ef" }}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ backgroundColor: "rgba(184,81,20,0.1)", color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
              Dúvidas Frequentes
            </div>
            <h2 className="mb-4" style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 400,
              color: "#2b3854",
              lineHeight: 1.2
            }}>
              Perguntas que nossos pacientes nos fazem
            </h2>
          </div>

          <div className="space-y-3">
            {previewFaqs.map((faq, i) => (
              <div key={faq.id} className="bg-white rounded-2xl overflow-hidden border border-[#dfddd9]">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
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
                  <div className="px-6 pb-5">
                    <p className="text-[#2b3854]/70 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif", fontSize: "0.9375rem" }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/faq">
              <span className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer hover:underline" style={{ color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
                Ver todas as perguntas
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Blog Preview
function BlogPreview() {
  const { data: posts } = trpc.blog.recent.useQuery();

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ backgroundColor: "rgba(184,81,20,0.1)", color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
              Blog
            </div>
            <h2 style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 400,
              color: "#2b3854",
              lineHeight: 1.2
            }}>
              Informação com responsabilidade
            </h2>
          </div>
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer whitespace-nowrap" style={{ color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
              Ver todos os artigos
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(posts ?? []).slice(0, 3).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="rounded-2xl overflow-hidden border border-[#dfddd9] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <div className="h-44 flex items-center justify-center" style={{ backgroundColor: "#2b3854" }}>
                  <NinfeiaSVG className="w-24 h-24 text-white" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(184,81,20,0.1)", color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
                      {post.category}
                    </span>
                    <span className="text-xs text-[#2b3854]/50" style={{ fontFamily: "'Onest', sans-serif" }}>{post.read_time} min de leitura</span>
                  </div>
                  <h3 className="mb-2 group-hover:text-[#b85114] transition-colors line-clamp-2" style={{
                    fontFamily: "'Noto Serif', serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "#2b3854"
                  }}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#2b3854]/60 line-clamp-2" style={{ fontFamily: "'Onest', sans-serif", lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Final
function CTASection() {
  return (
    <section className="section-padding" style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 60%, #3d5a7a 100%)" }}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <NinfeiaSVG className="w-20 h-20 text-white mx-auto mb-6 opacity-30" />
          <h2 className="text-white mb-5" style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: "clamp(1.75rem, 3vw, 3rem)",
            fontWeight: 400,
            lineHeight: 1.2
          }}>
              Pronta para iniciar sua jornada de transformação?
          </h2>
          <p className="text-white/65 mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1rem", lineHeight: 1.75 }}>
              Agende sua consulta e descubra como a Dra. Rebecca pode ajudar você a alcançar seus objetivos com segurança, naturalidade e cuidado humanizado.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/agendamento">
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif", boxShadow: "0 8px 24px rgba(184,81,20,0.4)" }}>
                Agendar Consulta
                <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/contato">
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: "1.5px solid rgba(255,255,255,0.4)", fontFamily: "'Onest', sans-serif" }}>
                Fale Conosco
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CredentialsSection />
      <AboutPreview />
      <ProceduresSection />
      <PatientJourneySection />
      <TestimonialsSection />
      <FAQPreview />
      <BlogPreview />
      <CTASection />
    </div>
  );
}
