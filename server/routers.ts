import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { query } from "./rawDb";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

// ─── Procedures Router ──────────────────────────────────────────────────────
const proceduresRouter = router({
  featured: publicProcedure.query(async () => {
    try {
      return await query(
        "SELECT id, name, slug, category, short_description, featured, sort_order FROM procedures WHERE featured = 1 ORDER BY sort_order ASC LIMIT 6"
      );
    } catch { return []; }
  }),

  all: publicProcedure.query(async () => {
    try {
      return await query(
        "SELECT id, name, slug, category, short_description, featured, sort_order FROM procedures ORDER BY category, sort_order ASC"
      );
    } catch { return []; }
  }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      try {
        const rows = await query("SELECT * FROM procedures WHERE slug = ? LIMIT 1", [input.slug]);
        return rows[0] ?? null;
      } catch { return null; }
    }),

  byCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ input }) => {
      try {
        return await query(
          "SELECT id, name, slug, category, short_description, sort_order FROM procedures WHERE category = ? ORDER BY sort_order ASC",
          [input.category]
        );
      } catch { return []; }
    }),
});

// ─── Blog Router ─────────────────────────────────────────────────────────────
const blogRouter = router({
  recent: publicProcedure.query(async () => {
    try {
      return await query(
        "SELECT id, title, slug, excerpt, category, tags, read_time, author, created_at FROM blog_posts WHERE published = 1 ORDER BY created_at DESC LIMIT 6"
      );
    } catch { return []; }
  }),

  all: publicProcedure
    .input(z.object({ category: z.string().optional(), search: z.string().optional() }).optional())
    .query(async ({ input }) => {
      try {
        let sql = "SELECT id, title, slug, excerpt, category, tags, read_time, author, created_at FROM blog_posts WHERE published = 1";
        const params: any[] = [];
        if (input?.category) { sql += " AND category = ?"; params.push(input.category); }
        if (input?.search) { sql += " AND (title LIKE ? OR excerpt LIKE ?)"; params.push(`%${input.search}%`, `%${input.search}%`); }
        sql += " ORDER BY created_at DESC";
        return await query(sql, params);
      } catch { return []; }
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      try {
        const rows = await query("SELECT * FROM blog_posts WHERE slug = ? AND published = 1 LIMIT 1", [input.slug]);
        return rows[0] ?? null;
      } catch { return null; }
    }),
});

// ─── FAQs Router ─────────────────────────────────────────────────────────────
const faqsRouter = router({
  list: publicProcedure.query(async () => {
    try {
      return await query("SELECT id, question, answer, category, sort_order FROM faqs WHERE active = 1 ORDER BY sort_order ASC");
    } catch { return []; }
  }),
});

// ─── Testimonials Router ──────────────────────────────────────────────────────
const testimonialsRouter = router({
  featured: publicProcedure.query(async () => {
    try {
      return await query(
        "SELECT id, patient_alias, procedure_name, content, rating FROM testimonials WHERE featured = 1 AND active = 1 ORDER BY created_at DESC"
      );
    } catch { return []; }
  }),

  all: publicProcedure.query(async () => {
    try {
      return await query(
        "SELECT id, patient_alias, procedure_name, content, rating FROM testimonials WHERE active = 1 ORDER BY created_at DESC"
      );
    } catch { return []; }
  }),
});

// ─── Gallery Router ───────────────────────────────────────────────────────────
const galleryRouter = router({
  all: publicProcedure
    .input(z.object({ category: z.string().optional() }).optional())
    .query(async ({ input }) => {
      try {
        let sql = "SELECT id, procedure_name, category, description FROM gallery_items WHERE active = 1 AND consent_given = 1";
        const params: any[] = [];
        if (input?.category) { sql += " AND category = ?"; params.push(input.category); }
        sql += " ORDER BY created_at DESC";
        return await query(sql, params);
      } catch { return []; }
    }),
});

// ─── Appointments Router ──────────────────────────────────────────────────────
const appointmentsRouter = router({
  create: publicProcedure
    .input(z.object({
      patient_name: z.string().min(2),
      patient_email: z.string().email(),
      patient_phone: z.string().optional(),
      procedure_interest: z.string().optional(),
      appointment_date: z.string(),
      appointment_time: z.string(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      await query(
        `INSERT INTO appointments (patient_name, patient_email, patient_phone, procedure_interest, appointment_date, appointment_time, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [input.patient_name, input.patient_email, input.patient_phone ?? null,
         input.procedure_interest ?? null, input.appointment_date, input.appointment_time, input.notes ?? null]
      );
      try {
        await notifyOwner({
          title: "Nova Solicitação de Consulta",
          content: `Paciente: ${input.patient_name}\nEmail: ${input.patient_email}\nTelefone: ${input.patient_phone ?? "Não informado"}\nProcedimento: ${input.procedure_interest ?? "Não especificado"}\nData: ${input.appointment_date} às ${input.appointment_time}`,
        });
      } catch { /* notification is non-critical */ }
      return { success: true };
    }),

  availableSlots: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ input }) => {
      const allSlots = [
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
        "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30",
      ];
      try {
        const rows = await query(
          "SELECT appointment_time FROM appointments WHERE appointment_date = ? AND status != 'cancelled'",
          [input.date]
        );
        const booked = rows.map((r: any) => {
          const t = r.appointment_time;
          return typeof t === "string" ? t.slice(0, 5) : "";
        });
        return allSlots.filter(slot => !booked.includes(slot));
      } catch { return allSlots; }
    }),
});

// ─── Contact Router ───────────────────────────────────────────────────────────
const contactRouter = router({
  send: publicProcedure
    .input(z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().optional(),
      subject: z.string().optional(),
      message: z.string().min(10),
    }))
    .mutation(async ({ input }) => {
      await query(
        "INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)",
        [input.name, input.email, input.phone ?? null, input.subject ?? null, input.message]
      );
      try {
        await notifyOwner({
          title: `Nova mensagem: ${input.subject ?? "Sem assunto"}`,
          content: `De: ${input.name} (${input.email})\nTelefone: ${input.phone ?? "Não informado"}\n\n${input.message}`,
        });
      } catch { /* notification is non-critical */ }
      return { success: true };
    }),
});

// ─── Chat / Assistente Virtual ────────────────────────────────────────────────
const chatRouter = router({
  send: publicProcedure
    .input(z.object({
      session_id: z.string(),
      message: z.string().min(1).max(1000),
    }))
    .mutation(async ({ input }) => {
      await query(
        "INSERT INTO chat_messages (session_id, role, content) VALUES (?, 'user', ?)",
        [input.session_id, input.message]
      );

      const history = await query(
        "SELECT role, content FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC LIMIT 20",
        [input.session_id]
      );

      const systemPrompt = `Você é a assistente virtual da Dra. Rebecca Rossener, cirurgiã plástica formada pela USP São Paulo, especialista em cirurgia reparadora, pediátrica e anomalias vasculares.

Seu papel é:
1. Responder dúvidas sobre procedimentos cirúrgicos e não-cirúrgicos de forma clara, ética e acolhedora
2. Informar sobre a formação e especialidades da Dra. Rebecca
3. Orientar sobre como agendar uma consulta
4. Qualificar leads, entendendo o interesse do paciente
5. Esclarecer dúvidas sobre recuperação, segurança e resultados esperados

Diretrizes importantes:
- NUNCA faça diagnósticos médicos ou recomende procedimentos específicos sem consulta
- Sempre reforce que a avaliação presencial é necessária para indicação cirúrgica
- Seja acolhedora, empática e profissional
- Para dúvidas complexas, oriente o paciente a agendar uma consulta
- Mencione que a Dra. Rebecca é formada pela USP e membro da SBCP quando relevante
- Responda em português brasileiro
- Mantenha respostas concisas (máximo 3 parágrafos)

Procedimentos: Rinoplastia, Blefaroplastia, Lifting Facial, Mamoplastia de Aumento, Mamoplastia Redutora, Abdominoplastia, Lipoaspiração, Otoplastia Pediátrica, Anomalias Vasculares, Toxina Botulínica, Preenchimento Facial.

Contato: WhatsApp (11) 99999-9999 | Email: contato@drarebeccarossener.com.br`;

      const response = await invokeLLM({
        messages: [
          { role: "system", content: systemPrompt },
          ...history.map((r: any) => ({ role: r.role as "user" | "assistant", content: r.content })),
        ],
      });

      const assistantMessage = response.choices[0]?.message?.content ?? "Desculpe, não consegui processar sua mensagem no momento. Por favor, entre em contato pelo WhatsApp: (11) 99999-9999.";

      await query(
        "INSERT INTO chat_messages (session_id, role, content) VALUES (?, 'assistant', ?)",
        [input.session_id, assistantMessage]
      );

      return { message: assistantMessage };
    }),

  history: publicProcedure
    .input(z.object({ session_id: z.string() }))
    .query(async ({ input }) => {
      try {
        return await query(
          "SELECT role, content, created_at FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC LIMIT 50",
          [input.session_id]
        );
      } catch { return []; }
    }),
});

// ─── App Router ───────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  procedures: proceduresRouter,
  blog: blogRouter,
  faqs: faqsRouter,
  testimonials: testimonialsRouter,
  gallery: galleryRouter,
  appointments: appointmentsRouter,
  contact: contactRouter,
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
