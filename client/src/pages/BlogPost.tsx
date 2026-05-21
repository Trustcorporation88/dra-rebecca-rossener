import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";

function NinfeiaSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 160 C100 160 60 130 60 90 C60 60 80 40 100 40 C120 40 140 60 140 90 C140 130 100 160 100 160Z" fill="currentColor" opacity="0.15"/>
      <path d="M100 160 C100 160 40 120 50 80 C58 50 80 45 100 60 C120 45 142 50 150 80 C160 120 100 160 100 160Z" fill="currentColor" opacity="0.12"/>
      <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = trpc.blog.bySlug.useQuery({ slug: slug ?? "" });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#2b3854] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-[#2b3854] mb-4" style={{ fontFamily: "'Noto Serif', serif" }}>Artigo não encontrado</h2>
          <Link href="/blog">
            <span className="text-[#b85114] hover:underline cursor-pointer" style={{ fontFamily: "'Onest', sans-serif" }}>← Voltar para o Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-20" style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 60%, #3d5a7a 100%)" }}>
        <div className="container">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer mb-6 text-sm" style={{ fontFamily: "'Onest', sans-serif" }}>
              <ArrowLeft size={14} />
              Voltar para o Blog
            </span>
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ backgroundColor: "rgba(184,81,20,0.2)", color: "#d4713a", fontFamily: "'Onest', sans-serif" }}>
              {post.category}
            </span>
            <h1 className="text-white mb-4" style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.15
            }}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/60">
              <span className="flex items-center gap-1.5 text-sm" style={{ fontFamily: "'Onest', sans-serif" }}>
                <Calendar size={13} />
                {new Date(post.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5 text-sm" style={{ fontFamily: "'Onest', sans-serif" }}>
                <Clock size={13} />
                {post.read_time} min de leitura
              </span>
              <span className="text-sm" style={{ fontFamily: "'Onest', sans-serif" }}>Por {post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image placeholder */}
      <div className="h-64 md:h-80 flex items-center justify-center" style={{ backgroundColor: "#2b3854" }}>
        <NinfeiaSVG className="w-40 h-40 text-white" />
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg max-w-none"
            style={{
              fontFamily: "'Onest', sans-serif",
              color: "#2b3854",
              lineHeight: 1.8,
            }}
          >
            {post.content?.split('\n').map((paragraph: string, i: number) => {
              if (!paragraph.trim()) return null;
              if (paragraph.startsWith('## ')) {
                return <h2 key={i} style={{ fontFamily: "'Noto Serif', serif", color: "#2b3854", fontSize: "1.5rem", fontWeight: 400, marginTop: "2rem", marginBottom: "0.75rem" }}>{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={i} style={{ fontFamily: "'Noto Serif', serif", color: "#2b3854", fontSize: "1.25rem", fontWeight: 500, marginTop: "1.5rem", marginBottom: "0.5rem" }}>{paragraph.replace('### ', '')}</h3>;
              }
              return <p key={i} style={{ marginBottom: "1rem", color: "rgba(43,56,84,0.75)" }}>{paragraph}</p>;
            })}
          </div>

          {/* Aviso médico */}
          <div className="mt-10 p-5 rounded-2xl border" style={{ backgroundColor: "rgba(184,81,20,0.05)", borderColor: "rgba(184,81,20,0.2)" }}>
            <p className="text-sm text-[#2b3854]/70 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
              <strong className="text-[#2b3854]">Aviso:</strong> Este artigo tem caráter exclusivamente informativo e educativo. Não substitui a avaliação médica individualizada. Para indicações e orientações específicas ao seu caso, consulte a Dra. Rebecca Rossener.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 p-8 rounded-2xl text-white text-center" style={{ background: "linear-gradient(135deg, #1c2840, #2b3854)" }}>
            <h3 className="mb-3" style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 400 }}>
              Ficou com dúvidas?
            </h3>
            <p className="text-white/65 mb-5 text-sm" style={{ fontFamily: "'Onest', sans-serif" }}>
              Agende uma consulta e tire todas as suas dúvidas com a Dra. Rebecca.
            </p>
            <Link href="/agendamento">
              <span className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "#b85114", fontFamily: "'Onest', sans-serif" }}>
                Agendar Consulta
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
