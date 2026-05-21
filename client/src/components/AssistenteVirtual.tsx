import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { nanoid } from "nanoid";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456826156/HWKyL9jRA5Tm279iBWxhfp/logo-dra-rebecca_b1cfb4d1.jpg";

const QUICK_QUESTIONS = [
  "Quais procedimentos a Dra. Rebecca realiza?",
  "Como funciona a consulta inicial?",
  "Quais são os cuidados pós-operatórios?",
  "Como agendar uma consulta?",
];

const SESSION_ID = nanoid();

export default function AssistenteVirtual() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou a assistente virtual da Dra. Rebecca Rossener. Estou aqui para responder suas dúvidas sobre procedimentos, consultas e muito mais. Como posso ajudar você hoje?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = trpc.chat.send.useMutation({
    onSuccess: (data) => {
      const msg = typeof data.message === "string" ? data.message : String(data.message);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: msg, timestamp: new Date() },
      ]);
      setIsTyping(false);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, tive um problema ao processar sua mensagem. Por favor, entre em contato pelo WhatsApp: (11) 99999-9999.",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    },
  });

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || isTyping) return;

    const userMessage: Message = { role: "user", content: msg, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    chatMutation.mutate({ session_id: SESSION_ID, message: msg });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed z-50 shadow-2xl"
          style={{
            bottom: "90px",
            right: "24px",
            width: "360px",
            maxWidth: "calc(100vw - 48px)",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(43,56,84,0.1)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ background: "linear-gradient(135deg, #1c2840, #2b3854)" }}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={LOGO_URL} alt="Logo" className="w-9 h-9 rounded-full object-cover" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Onest', sans-serif" }}>Assistente Virtual</p>
                <p className="text-white/60 text-xs" style={{ fontFamily: "'Onest', sans-serif" }}>Dra. Rebecca Rossener</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <Minimize2 size={14} />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <X size={14} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="bg-white overflow-y-auto" style={{ height: "360px", padding: "16px" }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2.5 mb-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: msg.role === "user" ? "#b85114" : "#2b3854" }}
                    >
                      {msg.role === "user" ? <User size={13} color="white" /> : <Bot size={13} color="white" />}
                    </div>
                    <div
                      className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={{
                        fontFamily: "'Onest', sans-serif",
                        backgroundColor: msg.role === "user" ? "#b85114" : "#f5f3ef",
                        color: msg.role === "user" ? "white" : "#2b3854",
                        borderBottomRightRadius: msg.role === "user" ? "4px" : "16px",
                        borderBottomLeftRadius: msg.role === "assistant" ? "4px" : "16px",
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2.5 mb-4">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#2b3854" }}>
                      <Bot size={13} color="white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm" style={{ backgroundColor: "#f5f3ef" }}>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#2b3854", animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#2b3854", animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#2b3854", animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick questions */}
              {messages.length === 1 && (
                <div className="bg-white border-t border-stone-100 px-3 py-2">
                  <p className="text-xs text-[#2b3854]/50 mb-2" style={{ fontFamily: "'Onest', sans-serif" }}>Perguntas frequentes:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-[#2b3854] hover:text-white hover:border-[#2b3854]"
                        style={{ fontFamily: "'Onest', sans-serif", borderColor: "#dfddd9", color: "#2b3854" }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="bg-white border-t border-stone-100 p-3 flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite sua dúvida..."
                  disabled={isTyping}
                  className="flex-1 px-3.5 py-2.5 rounded-full text-sm border border-stone-200 focus:outline-none focus:border-[#2b3854] transition-colors disabled:opacity-60"
                  style={{ fontFamily: "'Onest', sans-serif" }}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#b85114" }}
                >
                  <Send size={15} color="white" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
        className="fixed z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          bottom: "24px",
          right: "24px",
          background: "linear-gradient(135deg, #2b3854, #3d5a7a)",
        }}
        aria-label="Abrir assistente virtual"
      >
        {isOpen ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
        {!isOpen && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: "#b85114" }}
          >
            1
          </span>
        )}
      </button>
    </>
  );
}
