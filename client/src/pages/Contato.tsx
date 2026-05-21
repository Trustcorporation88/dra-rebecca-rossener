import { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { MapView } from "@/components/Map";

export default function Contato() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const sendMutation = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSent(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    },
    onError: () => {
      toast.error("Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Por favor, preencha os campos obrigatórios.");
      return;
    }
    sendMutation.mutate(form);
  };

  const handleMapReady = (map: google.maps.Map) => {
    setMapReady(true);
    const clinicLocation = { lat: -23.5629, lng: -46.6544 }; // Av. Paulista
    map.setCenter(clinicLocation);
    map.setZoom(15);
    new google.maps.Marker({
      position: clinicLocation,
      map,
      title: "Dra. Rebecca Rossener - Cirurgia Plástica",
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 60%, #3d5a7a 100%)" }}>
        <div className="container">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(184,81,20,0.2)", color: "#d4713a", fontFamily: "'Onest', sans-serif" }}>
              Contato
            </div>
            <h1 className="text-white mb-4" style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1
            }}>
              Entre em Contato
            </h1>
            <p className="text-white/70" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1.0625rem", lineHeight: 1.75 }}>
              Estamos aqui para responder suas dúvidas e ajudar você a dar o próximo passo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ backgroundColor: "#f5f3ef" }}>
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Info */}
            <div className="space-y-5">
              <div>
                <h2 className="mb-5" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: "#2b3854" }}>
                  Informações de Contato
                </h2>
              </div>

              {[
                {
                  icon: <MapPin size={20} />,
                  title: "Endereço",
                  lines: ["Av. Paulista, 1000 — Cj. 101", "Bela Vista, São Paulo — SP", "CEP 01310-100"],
                },
                {
                  icon: <Phone size={20} />,
                  title: "Telefone / WhatsApp",
                  lines: ["(11) 99999-9999"],
                  link: "https://wa.me/5511999999999",
                },
                {
                  icon: <Mail size={20} />,
                  title: "E-mail",
                  lines: ["contato@drarebeccarossener.com.br"],
                  link: "mailto:contato@drarebeccarossener.com.br",
                },
                {
                  icon: <Clock size={20} />,
                  title: "Horário de Atendimento",
                  lines: ["Segunda a Sexta: 8h às 18h", "Sábado: 8h às 13h"],
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-stone-100">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(184,81,20,0.1)" }}>
                    <span style={{ color: "#b85114" }}>{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#2b3854]/60 mb-1 uppercase tracking-wider" style={{ fontFamily: "'Onest', sans-serif" }}>
                      {item.title}
                    </p>
                    {item.lines.map((line, j) =>
                      item.link && j === 0 ? (
                        <a key={j} href={item.link} target="_blank" rel="noopener noreferrer"
                          className="block text-sm font-medium hover:underline" style={{ color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
                          {line}
                        </a>
                      ) : (
                        <p key={j} className="text-sm text-[#2b3854]/75" style={{ fontFamily: "'Onest', sans-serif" }}>{line}</p>
                      )
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma consulta com a Dra. Rebecca Rossener."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "#25D366", fontFamily: "'Onest', sans-serif" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar pelo WhatsApp
              </a>
            </div>

            {/* Formulário */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "rgba(184,81,20,0.1)" }}>
                      <CheckCircle2 size={32} style={{ color: "#b85114" }} />
                    </div>
                    <h3 className="mb-3" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: "#2b3854" }}>
                      Mensagem enviada!
                    </h3>
                    <p className="text-[#2b3854]/65 mb-6" style={{ fontFamily: "'Onest', sans-serif" }}>
                      Entraremos em contato em breve. Você também pode nos chamar pelo WhatsApp para uma resposta mais rápida.
                    </p>
                    <button onClick={() => setSent(false)} className="text-sm text-[#b85114] hover:underline" style={{ fontFamily: "'Onest', sans-serif" }}>
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-6" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: "#2b3854" }}>
                      Envie uma mensagem
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#2b3854]/70 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'Onest', sans-serif" }}>
                            Nome *
                          </label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            placeholder="Seu nome completo"
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#2b3854] transition-colors"
                            style={{ fontFamily: "'Onest', sans-serif" }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#2b3854]/70 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'Onest', sans-serif" }}>
                            E-mail *
                          </label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            placeholder="seu@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#2b3854] transition-colors"
                            style={{ fontFamily: "'Onest', sans-serif" }}
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#2b3854]/70 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'Onest', sans-serif" }}>
                            Telefone
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="(11) 99999-9999"
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#2b3854] transition-colors"
                            style={{ fontFamily: "'Onest', sans-serif" }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#2b3854]/70 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'Onest', sans-serif" }}>
                            Assunto
                          </label>
                          <select
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#2b3854] transition-colors"
                            style={{ fontFamily: "'Onest', sans-serif" }}
                          >
                            <option value="">Selecione...</option>
                            <option value="Agendamento de Consulta">Agendamento de Consulta</option>
                            <option value="Dúvidas sobre Procedimentos">Dúvidas sobre Procedimentos</option>
                            <option value="Pós-Operatório">Pós-Operatório</option>
                            <option value="Informações Gerais">Informações Gerais</option>
                            <option value="Outro">Outro</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#2b3854]/70 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'Onest', sans-serif" }}>
                          Mensagem *
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          required
                          rows={5}
                          placeholder="Descreva sua dúvida ou interesse..."
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#2b3854] transition-colors resize-none"
                          style={{ fontFamily: "'Onest', sans-serif" }}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sendMutation.isPending}
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-medium text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif" }}
                      >
                        {sendMutation.isPending ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={16} />
                            Enviar Mensagem
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="mt-10 rounded-3xl overflow-hidden shadow-sm border border-stone-100" style={{ height: "400px" }}>
            <MapView onMapReady={handleMapReady} className="w-full h-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
