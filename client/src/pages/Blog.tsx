import { useState } from "react";
import { ArrowRight, Search, Clock } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const blogCategories = [
  { key: "all", label: "Todos" },
  { key: "cirurgia-plastica", label: "Cirurgia Plástica" },
  { key: "saude", label: "Saúde e Bem-Estar" },
  { key: "pos-operatorio", label: "Pós-Operatório" },
  { key: "pediatria", label: "Cirurgia Pediátrica" },
  { key: "anomalias-vasculares", label: "Anomalias Vasculares" },
];

function NinfeiaSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 160 C100 160 60 130 60 90 C60 60 80 40 100 40 C120 40 140 60 140 90 C140 130 100 160 100 160Z" fill="currentColor" opacity="0.15"/>
      <path d="M100 160 C100 160 40 120 50 80 C58 50 80 45 100 60 C120 45 142 50 150 80 C160 120 100 160 100 160Z" fill="currentColor" opacity="0.12"/>
      <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const { data: posts = [], isLoading } = trpc.blog.all.useQuery(
    activeCategory !== "all" || search ? { category: activeCategory !== "all" ? activeCategory : undefined, search: search || undefined } : undefined
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "linear-gradient(135deg, #1c2840 0%, #2b3854 60%, #3d5a7a 100%)" }}>
        <div className="container">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(184,81,20,0.2)", color: "#d4713a", fontFamily: "'Onest', sans-serif" }}>
              Blog
            </div>
            <h1 className="text-white mb-4" style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1
            }}>
              Informação com responsabilidade
            </h1>
            <p className="text-white/70" style={{ fontFamily: "'Onest', sans-serif", fontSize: "1.0625rem", lineHeight: 1.75 }}>
              Artigos educativos sobre cirurgia plástica, saúde e bem-estar, escritos com rigor científico e linguagem acessível.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-6 bg-white border-b border-stone-100 sticky top-20 z-30">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat) => (
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
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2b3854]/40" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-full text-sm border border-stone-200 focus:outline-none focus:border-[#2b3854] transition-colors"
                style={{ fontFamily: "'Onest', sans-serif", backgroundColor: "#f5f3ef" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#f5f3ef" }}>
        <div className="container">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-44 bg-stone-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-stone-200 rounded w-1/3" />
                    <div className="h-5 bg-stone-200 rounded w-3/4" />
                    <div className="h-4 bg-stone-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#2b3854]/50 text-lg" style={{ fontFamily: "'Noto Serif', serif" }}>Nenhum artigo encontrado.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <div className="h-44 flex items-center justify-center" style={{ backgroundColor: "#2b3854" }}>
                      <NinfeiaSVG className="w-24 h-24 text-white" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(184,81,20,0.1)", color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
                          {blogCategories.find(c => c.key === post.category)?.label ?? post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#2b3854]/50" style={{ fontFamily: "'Onest', sans-serif" }}>
                          <Clock size={11} />
                          {post.read_time} min
                        </span>
                      </div>
                      <h3 className="mb-2 group-hover:text-[#b85114] transition-colors line-clamp-2" style={{
                        fontFamily: "'Noto Serif', serif",
                        fontSize: "1.0625rem",
                        fontWeight: 500,
                        color: "#2b3854"
                      }}>
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#2b3854]/60 line-clamp-2 mb-4" style={{ fontFamily: "'Onest', sans-serif", lineHeight: 1.6 }}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#2b3854]/50" style={{ fontFamily: "'Onest', sans-serif" }}>
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-medium" style={{ color: "#b85114", fontFamily: "'Onest', sans-serif" }}>
                          Ler artigo
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
