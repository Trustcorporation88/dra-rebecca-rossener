import { ArrowRight, Award, BookOpen, Heart, Shield, Star, CheckCircle2, GraduationCap } from "lucide-react";
import { Link } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456826156/HWKyL9jRA5Tm279iBWxhfp/logo-dra-rebecca_b1cfb4d1.jpg";

function NinfeiaSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 160 C100 160 60 130 60 90 C60 60 80 40 100 40 C120 40 140 60 140 90 C140 130 100 160 100 160Z" fill="currentColor" opacity="0.15"/>
      <path d="M100 160 C100 160 40 120 50 80 C58 50 80 45 100 60 C120 45 142 50 150 80 C160 120 100 160 100 160Z" fill="currentColor" opacity="0.12"/>
      <path d="M100 160 C100 160 20 110 40 70 C55 40 85 50 100 75 C115 50 145 40 160 70 C180 110 100 160 100 160Z" fill="currentColor" opacity="0.08"/>
      <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

export default function Sobre() {
  const valores = [
    { icon: <Heart size={22} />, title: "Acolhimento", desc: "Cada paciente é recebido com escuta ativa, empatia e respeito à sua individualidade." },
    { icon: <Shield size={22} />, title: "Ética", desc: "Indicações honestas, transparência total e compromisso com o bem-estar do paciente acima de tudo." },
    { icon: <Star size={22} />, title: "Excelência", desc: "Formação de alto nível pela USP e atualização contínua nas melhores técnicas cirúrgicas." },
    { icon: <BookOpen size={22} />, title: "Conhecimento", desc: "Medicina baseada em evidências, com rigor científico e responsabilidade em cada decisão." },
    { icon: <Award size={22} />, title: "Respeito", desc: "Respeito à autonomia do paciente, ao seu corpo e às suas expectativas reais." },
    { icon: <CheckCircle2 size={22} />, title: "Honestidade", desc: "Comunicação clara sobre indicações, riscos, limitações e resultados esperados." },
  ];

  const formacao = [
    { year: "2010–2016", title: "Graduação em Medicina", institution: "Faculdade de Medicina da USP — São Paulo", desc: "Uma das mais renomadas faculdades de medicina do mundo." },
    { year: "2017–2019", title: "Residência em Cirurgia Geral", institution: "Hospital das Clínicas — FMUSP", desc: "Formação sólida em cirurgia com exposição a casos de alta complexidade." },
    { year: "2019–2022", title: "Residência em Cirurgia Plástica", institution: "Hospital das Clínicas — FMUSP", desc: "Especialização em cirurgia plástica estética e reparadora." },
    { year: "2022–2023", title: "Fellowship em Cirurgia Pediátrica e Anomalias Vasculares", institution: "Instituto da Criança — HC FMUSP", desc: "Subespecialização em cirurgia plástica pediátrica e tratamento de anomalias vasculares." },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 60%, #3d5a7a 100%)" }}>
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ backgroundColor: "rgba(184,81,20,0.2)", color: "#d4713a", fontFamily: "'Onest', sans-serif" }}>
              Sobre a Médica
            </div>
            <h1 className="text-white mb-5" style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em"
            }}>
              Dra. Rebecca Rossener
            </h1>
            <p className="text-white/70 text-lg" style={{ fontFamily: "'Onest', sans-serif", lineHeight: 1.75 }}>
              Cirurgiã plástica formada pela USP, com especialização em cirurgia reparadora, pediátrica e anomalias vasculares. Uma trajetória marcada pela dedicação, pelo amor à medicina e pelo cuidado genuinamente humano com cada paciente.
            </p>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2b3854, #3d5a7a)" }}>
                <NinfeiaSVG className="w-64 h-64 text-white" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={LOGO_URL} alt="Dra. Rebecca Rossener" className="w-52 h-52 rounded-full object-cover ring-4 ring-white/20 shadow-2xl" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-stone-100 max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap size={16} style={{ color: "#b85114" }} />
                  <span className="text-xs font-bold text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>Formação</span>
                </div>
                <p className="text-sm font-semibold text-[#2b3854]" style={{ fontFamily: "'Noto Serif', serif" }}>Faculdade de Medicina da USP</p>
                <p className="text-xs text-[#2b3854]/60 mt-1" style={{ fontFamily: "'Onest', sans-serif" }}>São Paulo, Brasil</p>
              </div>
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
                style={{ backgroundColor: "rgba(184,81,20,0.1)", color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
                Minha História
              </div>
              <h2 className="mb-6" style={{
                fontFamily: "'Noto Serif', serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 400,
                color: "#2b3854",
                lineHeight: 1.2
              }}>
                Uma vocação que nasceu cedo e cresceu com propósito
              </h2>
              <div className="space-y-4 text-[#2b3854]/70" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1rem", lineHeight: 1.8 }}>
                <p>
                  Entrei na medicina com apenas 16 anos, sendo a primeira da família a seguir essa trajetória. Desde o início, sabia que queria mais do que tratar doenças — queria transformar vidas, restaurar a autoestima e cuidar de pessoas com um olhar humano e acolhedor.
                </p>
                <p>
                  A cirurgia plástica surgiu como a especialidade que unia minha habilidade técnica ao meu propósito de vida. Ao longo da residência no Hospital das Clínicas da USP, apaixonei-me pela cirurgia pediátrica e pelo tratamento de anomalias vasculares — áreas em que a cirurgia reparadora pode mudar profundamente a qualidade de vida de crianças e de suas famílias.
                </p>
                <p>
                  Participei de expedições cirúrgicas em regiões remotas do Brasil, levando cirurgia plástica reparadora a comunidades sem acesso a esse tipo de cuidado. Essa experiência reforçou meu compromisso com a medicina ética, acessível e humanizada.
                </p>
                <p>
                  Hoje, atendo pacientes que buscam tanto procedimentos estéticos quanto reparadores, sempre com a mesma dedicação: resultados naturais, segurança em primeiro lugar e um cuidado que vai muito além da cirurgia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#f5f3ef" }}>
        <div className="container">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ backgroundColor: "rgba(184,81,20,0.1)", color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
              Valores
            </div>
            <h2 style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 400,
              color: "#2b3854",
              lineHeight: 1.2
            }}>
              O que guia minha prática médica
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(184,81,20,0.1)" }}>
                  <span style={{ color: "#b85114" }}>{v.icon}</span>
                </div>
                <h3 className="mb-2" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.125rem", fontWeight: 500, color: "#2b3854" }}>
                  {v.title}
                </h3>
                <p className="text-sm text-[#2b3854]/65 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formação */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ backgroundColor: "rgba(184,81,20,0.1)", color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
                Formação & Credenciais
              </div>
              <h2 style={{
                fontFamily: "'Noto Serif', serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 400,
                color: "#2b3854",
                lineHeight: 1.2
              }}>
                Trajetória acadêmica e profissional
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: "#dfddd9" }} />
              <div className="space-y-8">
                {formacao.map((item, i) => (
                  <div key={i} className="relative pl-16">
                    <div className="absolute left-3 top-1 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white" style={{ backgroundColor: i === formacao.length - 1 ? "#b85114" : "#2b3854" }}>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                      <span className="text-xs font-semibold tracking-wider uppercase mb-2 block" style={{ color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
                        {item.year}
                      </span>
                      <h3 className="mb-1" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.0625rem", fontWeight: 500, color: "#2b3854" }}>
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium mb-1" style={{ color: "#617fba", fontFamily: "'Onest', sans-serif" }}>
                        {item.institution}
                      </p>
                      <p className="text-sm text-[#2b3854]/60" style={{ fontFamily: "'Onest', sans-serif" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Membros */}
            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              {[
                { title: "SBCP", desc: "Membro Titular da Sociedade Brasileira de Cirurgia Plástica", icon: <Award size={20} /> },
                { title: "CRM/SP", desc: "Registrada no Conselho Regional de Medicina de São Paulo", icon: <Shield size={20} /> },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: "#f5f3ef" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(184,81,20,0.15)" }}>
                    <span style={{ color: "#b85114" }}>{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>{item.title}</p>
                    <p className="text-xs text-[#2b3854]/60" style={{ fontFamily: "'Onest', sans-serif" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 60%, #3d5a7a 100%)" }}>
        <div className="container text-center">
          <h2 className="text-white mb-4" style={{ fontFamily: "'Noto Serif', serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 400 }}>
              Pronta para cuidar de você
          </h2>
          <p className="text-white/65 mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Onest', sans-serif" }}>
              Agende sua consulta e descubra como posso ajudar você a alcançar seus objetivos com segurança e naturalidade.
          </p>
          <Link href="/agendamento">
            <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif", boxShadow: "0 8px 24px rgba(184,81,20,0.4)" }}>
              Agendar Consulta
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
