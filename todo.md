# Dra. Rebecca Rossener - Site TODO

## Setup e Configuração
- [x] Inicializar projeto web com banco de dados e autenticação
- [x] Upload do logotipo para CDN
- [x] Configurar schema do banco de dados (blog, procedimentos, FAQ, agendamentos, depoimentos, galeria, chat)
- [x] Configurar design system (cores, fontes Noto Serif + Onest, variáveis CSS)
- [x] Configurar layout global com navegação responsiva

## Seções Principais (Home Page)
- [x] Hero Section com headline USP, CTA agendamento e elementos visuais ninféias
- [x] Seção Sobre a Dra. Rebecca (história, valores, propósito, credenciais USP/SBCP)
- [x] Seção Procedimentos (cards por categoria com preview)
- [x] Seção Jornada do Paciente (processo completo consulta → pós-op)
- [x] Seção Depoimentos de Pacientes (com ética e consentimento)
- [x] Seção FAQ (perguntas frequentes sobre procedimentos e segurança)
- [x] CTA Final (agendamento e contato)
- [x] Footer com informações da clínica e links

## Páginas Internas
- [x] Página de Procedimentos (catálogo completo por categoria)
- [x] Páginas individuais de procedimentos (descrição, indicações, recuperação, resultados)
- [x] Página Blog/Artigos com sistema de categorias e busca
- [x] Página individual de artigo do blog
- [x] Página Galeria Antes e Depois (com avisos éticos e anonimato)
- [x] Página Contato e Agendamento (formulário, mapa, informações)
- [x] Página Agendamento Online (calendário, horários disponíveis, confirmação)
- [x] Página Depoimentos (listagem completa com aviso ético)
- [x] Página FAQ (listagem completa com categorias)
- [x] Página Sobre (história, valores, formação, credenciais)

## Funcionalidades Avançadas
- [x] Sistema de agendamento online (calendário, slots disponíveis, confirmação)
- [x] Assistente virtual inteligente (chatbot 24/7 para dúvidas e qualificação de leads)
- [x] Mapa interativo Google Maps com localização da clínica e rotas
- [x] Formulário de contato com notificação para a médica
- [x] Galeria com avisos éticos (consentimento, anonimato, variação de resultados)

## Backend / API
- [x] Schema: tabelas blog_posts, procedures, faqs, appointments, testimonials, gallery_items, chat_messages, contact_messages
- [x] Routers tRPC para blog, procedimentos, FAQ, agendamentos, depoimentos, galeria, chat, contato
- [x] Assistente virtual com integração LLM (dúvidas sobre procedimentos)
- [x] Sistema de notificação para novos agendamentos e contatos
- [x] Dados iniciais inseridos (procedimentos, FAQs, depoimentos, artigos de blog)

## Design e UX
- [x] Paleta de cores brandbook aplicada (azul marinho #2b3854, azul médio #617fba, terracota #b85114, marrom #563f36, cinza #dfddd9)
- [x] Tipografia Noto Serif (títulos) + Onest (corpo) via Google Fonts
- [x] Elementos orgânicos inspirados em ninféias (SVG decorativos)
- [x] Animações suaves e micro-interações elegantes
- [x] Design totalmente responsivo (mobile-first)
- [x] Botão flutuante WhatsApp
- [x] Assistente virtual flutuante com FAB button

## Testes
- [x] Testes vitest para routers principais (14 testes passando)
- [x] Verificação visual no browser (hero, navbar, cores, fontes)

## Melhorias Futuras (Fase 2)
- [ ] Envio de confirmação de agendamento por email e lembretes automáticos
- [ ] Módulo admin de Blog com CRUD completo (criar/editar/excluir artigos)
- [ ] Sistema de upload e gestão da galeria (cadastro de imagens, consentimento)
- [ ] Auditoria e melhorias de acessibilidade WCAG 2.1 AA completa
- [x] Corrigir texto do rodapé: "Plástico" → "Cirurgiã Plástica"
