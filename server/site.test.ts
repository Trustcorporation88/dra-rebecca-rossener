import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the rawDb module so tests don't need a real DB
vi.mock("./rawDb", () => ({
  query: vi.fn(),
}));

// Mock LLM
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [{ message: { content: "Resposta simulada do assistente." } }],
  }),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { query } from "./rawDb";

const mockQuery = query as ReturnType<typeof vi.fn>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("procedures router", () => {
  beforeEach(() => mockQuery.mockReset());

  it("returns featured procedures", async () => {
    const mockProcedures = [
      { id: 1, name: "Rinoplastia", slug: "rinoplastia", category: "facial", short_description: "Cirurgia do nariz", featured: 1, sort_order: 1 },
    ];
    mockQuery.mockResolvedValueOnce(mockProcedures);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.procedures.featured();

    expect(result).toEqual(mockProcedures);
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("WHERE featured = 1"),
    );
  });

  it("returns all procedures", async () => {
    const mockProcedures = [
      { id: 1, name: "Rinoplastia", slug: "rinoplastia", category: "facial", short_description: "Cirurgia do nariz", featured: 1, sort_order: 1 },
      { id: 2, name: "Abdominoplastia", slug: "abdominoplastia", category: "corporal", short_description: "Cirurgia abdominal", featured: 0, sort_order: 1 },
    ];
    mockQuery.mockResolvedValueOnce(mockProcedures);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.procedures.all();

    expect(result).toHaveLength(2);
  });

  it("returns procedure by slug", async () => {
    const mockProc = { id: 1, name: "Rinoplastia", slug: "rinoplastia", category: "facial" };
    mockQuery.mockResolvedValueOnce([mockProc]);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.procedures.bySlug({ slug: "rinoplastia" });

    expect(result).toEqual(mockProc);
  });

  it("returns null for non-existent slug", async () => {
    mockQuery.mockResolvedValueOnce([]);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.procedures.bySlug({ slug: "nao-existe" });

    expect(result).toBeNull();
  });
});

describe("faqs router", () => {
  beforeEach(() => mockQuery.mockReset());

  it("returns active FAQs", async () => {
    const mockFaqs = [
      { id: 1, question: "Como funciona a consulta?", answer: "...", category: "consulta", sort_order: 1 },
    ];
    mockQuery.mockResolvedValueOnce(mockFaqs);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.faqs.list();

    expect(result).toEqual(mockFaqs);
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("WHERE active = 1"),
    );
  });
});

describe("appointments router", () => {
  beforeEach(() => mockQuery.mockReset());

  it("returns available time slots for a date", async () => {
    mockQuery.mockResolvedValueOnce([]); // no booked slots

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.appointments.availableSlots({ date: "2026-04-15" });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toMatch(/^\d{2}:\d{2}$/);
  });

  it("excludes booked slots", async () => {
    mockQuery.mockResolvedValueOnce([{ appointment_time: "09:00:00" }]);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.appointments.availableSlots({ date: "2026-04-15" });

    expect(result).not.toContain("09:00");
  });

  it("creates an appointment successfully", async () => {
    mockQuery.mockResolvedValueOnce({ insertId: 1 });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.appointments.create({
      patient_name: "Maria Silva",
      patient_email: "maria@example.com",
      patient_phone: "(11) 99999-9999",
      procedure_interest: "Rinoplastia",
      appointment_date: "2026-04-15",
      appointment_time: "09:00",
    });

    expect(result).toEqual({ success: true });
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO appointments"),
      expect.arrayContaining(["Maria Silva", "maria@example.com"]),
    );
  });
});

describe("contact router", () => {
  beforeEach(() => mockQuery.mockReset());

  it("saves contact message and returns success", async () => {
    mockQuery.mockResolvedValueOnce({ insertId: 1 });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.contact.send({
      name: "João Souza",
      email: "joao@example.com",
      message: "Gostaria de saber mais sobre rinoplastia.",
    });

    expect(result).toEqual({ success: true });
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO contact_messages"),
      expect.arrayContaining(["João Souza", "joao@example.com"]),
    );
  });
});

describe("blog router", () => {
  beforeEach(() => mockQuery.mockReset());

  it("returns recent blog posts", async () => {
    const mockPosts = [
      { id: 1, title: "Cuidados pós-operatórios", slug: "cuidados-pos-operatorios", category: "pos-operatorio", read_time: 5, author: "Dra. Rebecca Rossener" },
    ];
    mockQuery.mockResolvedValueOnce(mockPosts);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.blog.recent();

    expect(result).toEqual(mockPosts);
  });
});

describe("chat router", () => {
  beforeEach(() => mockQuery.mockReset());

  it("processes a chat message and returns AI response", async () => {
    mockQuery
      .mockResolvedValueOnce({ insertId: 1 }) // insert user message
      .mockResolvedValueOnce([{ role: "user", content: "Olá!" }]) // history
      .mockResolvedValueOnce({ insertId: 2 }); // insert assistant message

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.chat.send({
      session_id: "test-session-123",
      message: "Quais procedimentos vocês realizam?",
    });

    expect(result).toHaveProperty("message");
    expect(typeof result.message).toBe("string");
  });
});

describe("auth router", () => {
  it("returns null user when not authenticated", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("clears session cookie on logout", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(ctx.res.clearCookie).toHaveBeenCalled();
  });
});
