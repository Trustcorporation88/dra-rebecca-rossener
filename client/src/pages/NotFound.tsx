import { Link } from "wouter";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f5f3ef" }}>
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-stone-100 text-center max-w-lg mx-4">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(184,81,20,0.1)" }}>
            <AlertCircle size={40} style={{ color: "#b85114" }} />
          </div>
        </div>

        <h1 className="text-6xl font-bold mb-3" style={{ fontFamily: "'Noto Serif', serif", color: "#2b3854" }}>
          404
        </h1>

        <h2 className="text-xl mb-4" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 400, color: "#2b3854" }}>
          Página não encontrada
        </h2>

        <p className="text-[#2b3854]/60 mb-8 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
          A página que você está procurando não existe ou foi movida.
          Verifique o endereço ou retorne à página inicial.
        </p>

        <Link href="/">
          <span
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: "#2b3854", fontFamily: "'Onest', sans-serif" }}
          >
            <Home size={16} />
            Voltar ao Início
          </span>
        </Link>
      </div>
    </div>
  );
}
