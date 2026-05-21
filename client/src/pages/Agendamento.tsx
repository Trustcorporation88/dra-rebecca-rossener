import { useState } from "react";
import { Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft, User, Mail, Phone, MessageSquare } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const procedures = [
  "Avaliação Geral",
  "Rinoplastia",
  "Blefaroplastia",
  "Lifting Facial",
  "Mamoplastia de Aumento",
  "Mamoplastia Redutora",
  "Abdominoplastia",
  "Lipoaspiração",
  "Otoplastia Pediátrica",
  "Anomalias Vasculares",
  "Toxina Botulínica",
  "Preenchimento Facial",
  "Outro",
];

const DAYS_AHEAD = 60;

function getAvailableDates() {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 1; i <= DAYS_AHEAD; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const day = d.getDay();
    if (day === 0) continue; // Domingo
    if (day === 6) {
      // Sábado — apenas até 13h (incluir)
      dates.push(d.toISOString().split("T")[0]);
    } else {
      dates.push(d.toISOString().split("T")[0]);
    }
  }
  return dates;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}

export default function Agendamento() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [success, setSuccess] = useState(false);

  const availableDates = getAvailableDates();

  const { data: slots = [], isLoading: slotsLoading } = trpc.appointments.availableSlots.useQuery(
    { date: selectedDate },
    { enabled: !!selectedDate }
  );

  const createMutation = trpc.appointments.create.useMutation({
    onSuccess: () => {
      setSuccess(true);
      toast.success("Consulta agendada com sucesso! Nossa equipe entrará em contato em breve.");
    },
    onError: () => {
      toast.error("Erro ao agendar a consulta. Tente novamente ou entre em contato pelo WhatsApp.");
    },
  });

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      toast.error("Por favor, preencha o nome e o e-mail.");
      return;
    }
    createMutation.mutate({
      patient_name: form.name,
      patient_email: form.email,
      patient_phone: form.phone || undefined,
      procedure_interest: selectedProcedure || undefined,
      appointment_date: selectedDate,
      appointment_time: selectedTime,
      notes: form.notes || undefined,
    });
  };

  if (success) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: "#f5f3ef" }}>
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-stone-100 text-center max-w-lg mx-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(184,81,20,0.1)" }}>
            <CheckCircle2 size={40} style={{ color: "#b85114" }} />
          </div>
          <h2 className="mb-3" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.75rem", fontWeight: 400, color: "#2b3854" }}>
            Consulta Agendada!
          </h2>
          <p className="text-[#2b3854]/65 mb-2" style={{ fontFamily: "'Onest', sans-serif" }}>
            Sua solicitação foi recebida com sucesso!
          </p>
          <div className="my-6 p-4 rounded-xl text-left space-y-2" style={{ backgroundColor: "#f5f3ef" }}>
            <p className="text-sm text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>
              <strong>Data:</strong> {formatDate(selectedDate)}
            </p>
            <p className="text-sm text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>
              <strong>Horário:</strong> {selectedTime}
            </p>
            {selectedProcedure && (
              <p className="text-sm text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>
                <strong>Interesse:</strong> {selectedProcedure}
              </p>
            )}
          </div>
          <p className="text-sm text-[#2b3854]/60 mb-6" style={{ fontFamily: "'Onest', sans-serif" }}>
            Nossa equipe entrará em contato para confirmar o agendamento. Em caso de dúvidas, entre em contato pelo WhatsApp.
          </p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: "#25D366", fontFamily: "'Onest', sans-serif" }}
          >
            Confirmar pelo WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-14 md:py-20" style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 60%, #3d5a7a 100%)" }}>
        <div className="container">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(184,81,20,0.2)", color: "#d4713a", fontFamily: "'Onest', sans-serif" }}>
              Agendamento
            </div>
            <h1 className="text-white mb-3" style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.1
            }}>
              Agendar Consulta
            </h1>
            <p className="text-white/70" style={{ fontFamily: "'Onest', sans-serif", lineHeight: 1.75 }}>
              Escolha a data e o horário de sua preferência. Nossa equipe confirmará o agendamento em breve.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20" style={{ backgroundColor: "#f5f3ef" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Steps indicator */}
            <div className="flex items-center gap-2 mb-10">
              {[
                { n: 1, label: "Procedimento" },
                { n: 2, label: "Data e Horário" },
                { n: 3, label: "Seus Dados" },
              ].map((s, i) => (
                <div key={s.n} className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${step >= s.n ? "text-white" : "text-[#2b3854]/40"}`}
                    style={{ backgroundColor: step >= s.n ? "#b85114" : "#dfddd9" }}>
                    {step > s.n ? "✓" : s.n}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${step >= s.n ? "text-[#2b3854]" : "text-[#2b3854]/40"}`} style={{ fontFamily: "'Onest', sans-serif" }}>
                    {s.label}
                  </span>
                  {i < 2 && <div className="flex-1 h-0.5 mx-2" style={{ backgroundColor: step > s.n ? "#b85114" : "#dfddd9" }} />}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
              {/* Step 1: Procedimento */}
              {step === 1 && (
                <div>
                  <h2 className="mb-2" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: "#2b3854" }}>
                    Qual é o seu interesse?
                  </h2>
                  <p className="text-sm text-[#2b3854]/60 mb-6" style={{ fontFamily: "'Onest', sans-serif" }}>
                    Selecione o procedimento ou o tipo de consulta desejado.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {procedures.map((proc) => (
                      <button
                        key={proc}
                        onClick={() => setSelectedProcedure(proc)}
                        className="px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200"
                        style={{
                          fontFamily: "'Onest', sans-serif",
                          backgroundColor: selectedProcedure === proc ? "#2b3854" : "#f5f3ef",
                          color: selectedProcedure === proc ? "white" : "#2b3854",
                          border: `1.5px solid ${selectedProcedure === proc ? "#2b3854" : "transparent"}`,
                        }}
                      >
                        {proc}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                    style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif" }}
                  >
                    Continuar
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 2: Data e Horário */}
              {step === 2 && (
                <div>
                  <h2 className="mb-2" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: "#2b3854" }}>
                    Escolha a data e horário
                  </h2>
                  <p className="text-sm text-[#2b3854]/60 mb-6" style={{ fontFamily: "'Onest', sans-serif" }}>
                    Atendemos de segunda a sexta-feira, das 8h às 18h, e aos sábados, das 8h às 13h.
                  </p>

                  {/* Datas */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={16} style={{ color: "#b85114" }} />
                      <span className="text-xs font-semibold text-[#2b3854]/70 uppercase tracking-wider" style={{ fontFamily: "'Onest', sans-serif" }}>Data</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {availableDates.slice(0, 14).map((date) => {
                        const d = new Date(date + "T12:00:00");
                        const isSelected = selectedDate === date;
                        const isSat = d.getDay() === 6;
                        return (
                          <button
                            key={date}
                            onClick={() => { setSelectedDate(date); setSelectedTime(""); }}
                            className="flex flex-col items-center px-3 py-2.5 rounded-xl shrink-0 transition-all duration-200"
                            style={{
                              minWidth: "64px",
                              backgroundColor: isSelected ? "#2b3854" : "#f5f3ef",
                              color: isSelected ? "white" : "#2b3854",
                              border: `1.5px solid ${isSelected ? "#2b3854" : "transparent"}`,
                            }}
                          >
                            <span className="text-xs font-medium mb-0.5" style={{ fontFamily: "'Onest', sans-serif" }}>
                              {d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")}
                            </span>
                            <span className="text-lg font-bold" style={{ fontFamily: "'Noto Serif', serif" }}>
                              {d.getDate()}
                            </span>
                            <span className="text-xs" style={{ fontFamily: "'Onest', sans-serif" }}>
                              {d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Horários */}
                  {selectedDate && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock size={16} style={{ color: "#b85114" }} />
                        <span className="text-xs font-semibold text-[#2b3854]/70 uppercase tracking-wider" style={{ fontFamily: "'Onest', sans-serif" }}>Horário</span>
                      </div>
                      {slotsLoading ? (
                        <div className="flex gap-2 flex-wrap">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="w-20 h-10 bg-stone-200 rounded-xl animate-pulse" />
                          ))}
                        </div>
                      ) : slots.length === 0 ? (
                        <p className="text-sm text-[#2b3854]/60" style={{ fontFamily: "'Onest', sans-serif" }}>
                          Nenhum horário disponível para esta data. Escolha outra data.
                        </p>
                      ) : (
                        <div className="flex gap-2 flex-wrap">
                          {slots.map((slot: string) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                              style={{
                                fontFamily: "'Onest', sans-serif",
                                backgroundColor: selectedTime === slot ? "#b85114" : "#f5f3ef",
                                color: selectedTime === slot ? "white" : "#2b3854",
                              }}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-colors"
                      style={{ border: "1.5px solid #dfddd9", color: "#2b3854", fontFamily: "'Onest', sans-serif" }}>
                      <ArrowLeft size={14} />
                      Voltar
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="flex items-center gap-2 px-7 py-3 rounded-full font-medium text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif" }}
                    >
                      Continuar
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Dados pessoais */}
              {step === 3 && (
                <div>
                  <h2 className="mb-2" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: "#2b3854" }}>
                    Seus dados
                  </h2>
                  <p className="text-sm text-[#2b3854]/60 mb-6" style={{ fontFamily: "'Onest', sans-serif" }}>
                    Preencha seus dados para confirmar o agendamento.
                  </p>

                  {/* Resumo */}
                  <div className="p-4 rounded-xl mb-6 flex flex-wrap gap-4" style={{ backgroundColor: "#f5f3ef" }}>
                    <div>
                      <p className="text-xs text-[#2b3854]/50 mb-0.5" style={{ fontFamily: "'Onest', sans-serif" }}>Data</p>
                      <p className="text-sm font-medium text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>{formatDate(selectedDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#2b3854]/50 mb-0.5" style={{ fontFamily: "'Onest', sans-serif" }}>Horário</p>
                      <p className="text-sm font-medium text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>{selectedTime}</p>
                    </div>
                    {selectedProcedure && (
                      <div>
                        <p className="text-xs text-[#2b3854]/50 mb-0.5" style={{ fontFamily: "'Onest', sans-serif" }}>Interesse</p>
                        <p className="text-sm font-medium text-[#2b3854]" style={{ fontFamily: "'Onest', sans-serif" }}>{selectedProcedure}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2b3854]/70 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'Onest', sans-serif" }}>
                        <User size={12} /> Nome Completo *
                      </label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                        placeholder="Seu nome completo"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#2b3854] transition-colors"
                        style={{ fontFamily: "'Onest', sans-serif" }} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2b3854]/70 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'Onest', sans-serif" }}>
                          <Mail size={12} /> E-mail *
                        </label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                          placeholder="seu@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#2b3854] transition-colors"
                          style={{ fontFamily: "'Onest', sans-serif" }} />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2b3854]/70 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'Onest', sans-serif" }}>
                          <Phone size={12} /> Telefone
                        </label>
                        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="(11) 99999-9999"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#2b3854] transition-colors"
                          style={{ fontFamily: "'Onest', sans-serif" }} />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2b3854]/70 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'Onest', sans-serif" }}>
                        <MessageSquare size={12} /> Observações
                      </label>
                      <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
                        placeholder="Alguma informação adicional que queira compartilhar..."
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#2b3854] transition-colors resize-none"
                        style={{ fontFamily: "'Onest', sans-serif" }} />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-colors"
                      style={{ border: "1.5px solid #dfddd9", color: "#2b3854", fontFamily: "'Onest', sans-serif" }}>
                      <ArrowLeft size={14} />
                      Voltar
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={createMutation.isPending}
                      className="flex items-center gap-2 px-7 py-3 rounded-full font-medium text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif" }}
                    >
                      {createMutation.isPending ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Confirmar Agendamento
                          <CheckCircle2 size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
