# Portfolio FreitasDev

Portfólio de **Josué Freitas (FreitasDev)** — Engenharia de Software • Arquitetura Backend & Sistemas Distribuídos • IoT.

**Produção:** <https://portfolio-freitasdev.vercel.app>

---

## Sobre

Portfólio single-page construído para posicionar uma engenharia de software orientada a backend crítico e IoT embarcado: APIs bancárias em Go (Clean Architecture, PostgreSQL, Railway), telemetria com ESP32 e dashboards Next.js/Leaflet — com conteúdo **bilingue PT-BR / EN** alternável por um clique, sem mudança de URL.

## Stack

| Camada | Tecnologias |
| --- | --- |
| Framework | Next.js (App Router), React, TypeScript |
| Estilo | Tailwind CSS, shadcn/ui, Fira Code + Antic (Google Fonts) |
| Animações | Framer Motion, CSS keyframes customizadas |
| Formulário | EmailJS (contato direto, sem backend de e-mail) |
| Dados | Prisma ORM + SQLite (`prisma/schema.prisma`, `db/custom.db`) |
| Runtime/Build | Bun (`bun run build` → `prisma generate` + `next build`, saída standalone) |
| Deploy | Vercel |

## Arquitetura

```
src/
├── app/
│   ├── layout.tsx          # Metadata PT-BR, JSON-LD (Person), fontes, Toaster
│   ├── page.tsx           # Home — compõe as 15+ seções dentro de <LanguageProvider>
│   └── globals.css        # Design tokens (dark/light) e utilitários
├── components/
│   ├── sections/          # Cada bloco da página (hero, about, projects, journey…)
│   ├── navigation/        # Header, banner de disponibilidade, language-toggle, back-to-top
│   ├── features/          # Command palette (Ctrl+K) e painel de atalhos
│   ├── effects/           # Cursor glow, floating paths, scroll reveal
│   └── ui/                # Primitivos shadcn/ui
├── hooks/                 # use-toast, use-mobile
└── lib/
    ├── i18n/
    │   ├── translations.ts       # Dicionário central PT-BR ⇄ EN (fonte única de conteúdo)
    │   └── language-context.tsx   # Provider + hook useLanguage() (localStorage: portfolio-lang)
    ├── db.ts               # Cliente Prisma
    └── utils.ts            # Helpers (cn etc.)
```

### Padrões de projeto relevantes

- **Conteúdo separado de apresentação:** todo texto visível vive em `src/lib/i18n/translations.ts`; ícones, imagens, links e métricas ficam nos componentes e são mesclados por índice/chave — nenhum texto duplicado no JSX.
- **Tema e idioma seguem o mesmo padrão:** `localStorage` + contexto React, sem routing — a URL de produção nunca muda.
- **Seção de idioma:** `LanguageToggle` (PT | EN) no header e ação `Languages` na command palette (atalho `L`); `<html lang>` é sincronizado para acessibilidade/SEO.

## Scripts

```bash
bun install          # dependências (bun.lock)
bun run dev          # desenvolvimento em localhost:3000
bun run build        # prisma generate + next build (standalone) + cópia de assets
bun run start        # serve o build standalone
bun run db:push      # aplica schema Prisma no SQLite
```

Variáveis de ambiente (contato por e-mail):

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

## Projetos em destaque

| Projeto | Repo | Demo |
| --- | --- | --- |
| Delta Bank Backend (Go, Clean Architecture, ACID, slog) | [Delta-Bank-Backend-In-Golang](https://github.com/Joshua-likesjs/Delta-Bank-Backend-In-Golang) | [Railway](https://delta-bank-backend-in-golang-production.up.railway.app) |
| TALON (ESP32 + LTE/GPRS, Firebase, Leaflet) | [TALON](https://github.com/Joshua-likesjs/TALON) | [Vercel](https://talon-beta.vercel.app) |
| ChocaSystem (ESP32, PID) | [Projeto-ChocaSystem](https://github.com/Joshua-likesjs/Projeto-ChocaSystem) | [Vercel](https://incubadora-vpjs.vercel.app) |

## Contato

- Email: <freitascontactdev@gmail.com>
- GitHub: <https://github.com/Joshua-likesjs>
- LinkedIn: <https://www.linkedin.com/in/josué-freitas-442a1a402/>
- Local: Manaus, AM — Brasil (remoto para qualquer fuso)
