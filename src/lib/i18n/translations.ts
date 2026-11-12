/**
 * Central bilingual dictionary (PT-BR / EN) for the FreitasDev portfolio.
 *
 * Single source of truth for every user-facing string. Icons, images, links
 * and numeric levels live in the components themselves — this file carries
 * text only, keyed by section, so both locales always share the same shape
 * (en is typed as `Dict`, which is `typeof pt`).
 */

export type Locale = 'pt' | 'en';

const pt = {
  nav: {
    home: 'INÍCIO',
    about: 'SOBRE',
    projects: 'PROJETOS',
    skills: 'SKILLS',
    education: 'FORMAÇÃO',
    faq: 'FAQ',
    contact: 'CONTATO',
  },

  banner: {
    text: 'Disponível para novos projetos',
    updated: 'Atualizado Nov 2026',
  },

  hero: {
    badge: 'Manaus, AM — Brasil • Técnico em Informática (Fundação Matias Machline)',
    headline: 'Engenharia de Software • Arquitetura Backend & Sistemas Distribuídos • IoT',
    ctaPrimary: 'Fale comigo',
    ctaSecondary: 'Ver Projetos',
    themeToast: 'Tema alterado',
    phrases: [
      'Software resiliente, escalável e orientado a retorno real.',
      'Backends críticos de alta concorrência.',
      'Hardware embarcado e tempo real em produção.',
      'Complexidade técnica traduzida em eficiência operacional.',
    ],
  },

  about: {
    heading: 'SOBRE',
    intro:
      'Engenharia de software com foco em sistemas backend e IoT — de hardware embarcado a APIs críticas.',
    bio1:
      'Construo software resiliente, escalável e orientado a retorno real de negócio. Minha atuação conecta hardware embarcado e tempo real a backends críticos de alta concorrência — traduzindo complexidade técnica em eficiência operacional e entregas tangíveis.',
    bio2:
      'Base técnica pelo curso Técnico em Informática da Fundação Matias Machline (Manaus), com monitoria no clube de programação. Atuo em APIs bancárias (Go + PostgreSQL, Clean Architecture) e telemetria IoT (ESP32 + Next.js/Leaflet), sempre com deploy e observabilidade em produção.',
    availableBadge: 'Disponível',
    badges: ['3 Projetos em produção', 'Backend + IoT'],
    currentlyTitle: 'Atualmente',
    status: [
      { label: 'Disponível para projetos', description: 'Backends, APIs e sistemas IoT' },
      { label: 'Manaus, AM', description: 'Remoto para qualquer fuso' },
      { label: 'Resposta', description: 'Em até 24h' },
    ],
    categories: [
      {
        label: 'Backend & Sistemas',
        skills: [
          { name: 'Go', level: 84 },
          { name: 'Node.js', level: 78 },
          { name: 'TypeScript', level: 92 },
          { name: 'REST & Clean Architecture', level: 80 },
        ],
      },
      {
        label: 'Frontend & Geometria Espacial',
        skills: [
          { name: 'React / Next.js', level: 75 },
          { name: 'Tailwind CSS', level: 90 },
          { name: 'shadcn/ui', level: 78 },
          { name: 'Leaflet / Geolib', level: 72 },
        ],
      },
      {
        label: 'Dados & Cloud',
        skills: [
          { name: 'PostgreSQL', level: 80 },
          { name: 'SQLite', level: 82 },
          { name: 'Prisma', level: 65 },
          { name: 'Firebase Auth & RTDB', level: 68 },
        ],
      },
      {
        label: 'Embarcados, IoT & Processos',
        skills: [
          { name: 'ESP32', level: 80 },
          { name: 'C/C++', level: 78 },
          { name: 'UART / AT', level: 70 },
          { name: 'GPS / GNSS', level: 72 },
        ],
      },
    ],
  },

  skillsRadar: {
    heading: 'COMPETÊNCIAS',
    intro: 'Distribuição das minhas competências nos domínios em que atuo.',
    axes: [
      { name: 'Backend', value: 83 },
      { name: 'Frontend', value: 73 },
      { name: 'Embarcados', value: 80 },
      { name: 'Dados', value: 75 },
      { name: 'Cloud', value: 78 },
    ],
    legend: ['70–79: Proficiente', '80–89: Avançado', '90+: Especialista'],
  },

  stats: {
    heading: 'NÚMEROS',
    intro: 'O que está de fato em produção — não métricas de vaidade.',
    items: [
      { value: 3, suffix: '+', label: 'Projetos em produção' },
      { value: 2, suffix: '', label: 'Plataformas Cloud' },
      { value: 4, suffix: '', label: 'Domínios técnicos' },
      { value: 1, suffix: '+', label: 'Ano construindo software' },
    ],
  },

  services: {
    heading: 'O QUE EU FAÇO',
    intro: 'Atuação em três frentes — backend, IoT embarcado e dados — com deploy contínuo.',
    items: [
      {
        title: 'Backend & APIs Críticas',
        description:
          'APIs REST com Go e Node.js sob Clean Architecture: transações ACID, autenticação, validação de regras de negócio e logging estruturado com slog.',
        tags: ['Go', 'Node.js', 'REST'],
      },
      {
        title: 'Frontend & Dashboards',
        description:
          'Interfaces React/Next.js com Tailwind e shadcn/ui — incluindo mapas em tempo real com Leaflet para telemetria, rastreamento e geofencing.',
        tags: ['React', 'Next.js', 'Tailwind'],
      },
      {
        title: 'IoT & Sistemas Embarcados',
        description:
          'Firmware C++ para ESP32 com GPS/GNSS e conectividade LTE/GPRS — fallback Wi-Fi, protocolos UART/AT e geofencing no campo.',
        tags: ['ESP32', 'C++', 'GPS'],
      },
      {
        title: 'Dados & Persistência',
        description:
          'Modelagem relacional em PostgreSQL e SQLite com Prisma ORM — integridade transacional e valores consistentes (inteiros, sem erro de ponto flutuante).',
        tags: ['PostgreSQL', 'SQLite', 'Prisma'],
      },
      {
        title: 'Cloud & Deploy',
        description:
          'Deploy contínuo em Railway e Vercel, com variáveis de ambiente isoladas, health checks e observabilidade desde o primeiro dia.',
        tags: ['Railway', 'Vercel'],
      },
      {
        title: 'QA & Confiabilidade',
        description:
          'Validação de regras de negócio, testes de fluxos críticos e tratamento de erros com respostas HTTP semânticas — o erro tratado faz parte do contrato.',
        tags: ['Testes', 'Validação'],
      },
    ],
  },

  process: {
    heading: 'COMO EU TRABALHO',
    intro: 'Um processo enxuto de quatro etapas — cada uma entrega algo verificável.',
    keyToolsTitle: 'Ferramentas',
    steps: [
      {
        title: 'Contexto & Requisitos',
        description:
          'Escopo, regras de negócio e restrições definidos antes da primeira linha de código — ambiguidade não é carregada adiante.',
        details: ['Call de alinhamento', 'Regras de negócio', 'Restrições técnicas', 'Escopo fechado'],
        keyTools: ['Obsidian'],
      },
      {
        title: 'Arquitetura & Design Técnico',
        description:
          'Camadas com dependências unidirecionais, contratos de interface e modelo de dados definidos — arquitetura que é barata de mudar cedo.',
        details: ['Clean Architecture', 'Modelo de dados', 'Contratos de API', 'Plano de deploy'],
        keyTools: ['Figma'],
      },
      {
        title: 'Implementação & Testes',
        description:
          'Código com logging estruturado, middlewares de produção e validação contínua — cada fluxo crítico é testado antes do deploy.',
        details: ['Sprints de código', 'Code review', 'QA de fluxos', 'Logging com slog'],
        keyTools: ['Go', 'TypeScript'],
      },
      {
        title: 'Deploy & Operação',
        description:
          'Deploy em Railway/Vercel com health checks e observação — um sistema em produção é responsabilidade da engenharia, não um evento final.',
        details: ['Deploy contínuo', 'Health checks', 'Monitoramento', 'Handoff'],
        keyTools: ['Railway', 'Vercel'],
      },
    ],
  },

  techMarquee: {
    heading: 'TECH STACK',
    intro: 'As tecnologias que sustentam os projetos em produção.',
    items: [
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'TypeScript', category: 'Linguagem' },
      { name: 'Tailwind CSS', category: 'Estilo' },
      { name: 'Go', category: 'Backend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'C++', category: 'Embarcados' },
      { name: 'ESP32', category: 'Embarcados' },
      { name: 'PostgreSQL', category: 'Dados' },
      { name: 'SQLite', category: 'Dados' },
      { name: 'Prisma', category: 'ORM' },
      { name: 'Firebase', category: 'Dados' },
      { name: 'Leaflet', category: 'Mapas' },
      { name: 'Git', category: 'Ferramentas' },
      { name: 'Vercel', category: 'Hospedagem' },
      { name: 'Railway', category: 'Hospedagem' },
    ],
  },

  projects: {
    heading: 'PROJETOS',
    intro: 'Sistemas que estão no ar — backend bancário, telemetria IoT e monitoramento embarcado.',
    categories: ['Todos', 'Backend', 'Web & IoT', 'Full-Stack'],
    featuredLabel: 'Destaque',
    viewDetails: 'Ver detalhes',
    liveLabel: 'Demo',
    sourceLabel: 'Código',
    highlightsTitle: 'Destaques',
    items: [
      {
        name: 'Delta Bank Backend',
        description:
          'API bancária em Go com Clean Architecture e PostgreSQL — transferências PIX, autenticação bcrypt e logging estruturado, em produção na Railway.',
        fullDescription:
          'API RESTful para sistema bancário digital em Go 1.22+ com Clean Architecture de dependências unidirecionais, PostgreSQL via pgxpool e transações ACID com valores em centavos (INTEGER). Inclui middlewares de produção — Recovery, Timeout, MaxBodyBytes — logging estruturado em JSON com log/slog e X-Request-ID, além de graceful shutdown. Deploy contínuo na Railway, com todas as rotas sob o prefixo /api.',
        tags: ['Go', 'PostgreSQL', 'Railway'],
        highlights: [
          'Clean Architecture',
          'ACID / pgxpool',
          'PIX & bcrypt',
          'slog JSON + X-Request-ID',
          'Middlewares de produção',
          'Graceful shutdown',
        ],
      },
      {
        name: 'TALON',
        description:
          'Rede de rastreamento e localização para felinos brasileiros ameaçados de extinção — IoT e tecnologia embarcada a serviço da conservação da vida selvagem.',
        fullDescription:
          'Sistema embarcado LilyGo T-SIM7000G (ESP32 + modem celular + GPS) com fallback Wi-Fi → GPRS/LTE e protocolos UART/AT. Dashboard Next.js com Leaflet: mapa em tempo real, histórico de localização, heatmap/rastreamento e geofencing — com Firebase Auth & RTDB no backend.',
        tags: ['ESP32', 'Next.js', 'Leaflet'],
        highlights: [
          'LilyGo T-SIM7000G',
          'Fallback Wi-Fi → GPRS/LTE',
          'UART / AT',
          'Firebase Auth & RTDB',
          'Geofencing',
          'Heatmap & histórico',
        ],
      },
      {
        name: 'ChocaSystem',
        description:
          'Monitoramento de variáveis em incubadora de ovos, com controle de aquecedores e umidificadores e detector de presença.',
        fullDescription:
          'Sistema embarcado com aquecedores e umidificadores acionados por ESP32, controle PID para regulação térmica e dashboard em tempo real com temperatura, umidade e presença.',
        tags: ['ESP32', 'PID', 'Next.js'],
        highlights: ['Controle PID', 'Sensores', 'Dashboard em tempo real', 'Detector de presença'],
      },
    ],
  },

  education: {
    heading: 'FORMAÇÃO',
    degree: 'Técnico em Informática',
    school: 'Fundação Matias Machline',
    location: 'Manaus, AM — Brasil',
    period: '2024 – 2026',
    bullets: [
      'Formação técnica full-stack web e mobile com foco em integração de sistemas embarcados',
      'Monitoria no clube de programação — ensino estruturado dos fundamentos de código',
    ],
  },

  faq: {
    heading: 'FAQ',
    intro: 'Perguntas frequentes sobre trabalho conjunto. Não achou o que procura? Me escreva direto.',
    items: [
      {
        question: 'Qual o prazo típico de um projeto?',
        answer:
          'Depende do domínio: uma API REST com regras bem definidas leva de 2 a 4 semanas; sistemas com hardware embarcado exigem janelas de validação física e costumam levar de 6 a 10 semanas. O prazo fechado sai depois do primeiro alinhamento de escopo.',
      },
      {
        question: 'Como é o seu processo, do requisito ao deploy?',
        answer:
          'Contexto e regras de negócio primeiro; arquitetura com dependências unidirecionais e contratos de interface; implementação com logging estruturado e QA dos fluxos críticos; deploy em Railway/Vercel com health checks. Cada etapa entrega algo verificável.',
      },
      {
        question: 'Você trabalha com sistemas ou design systems já existentes?',
        answer:
          'Sim — codebase legado, design system em Figma ou restrições de infraestrutura: eu me adapto ao que já existe e evito reescrever o que já funciona.',
      },
      {
        question: 'Como funciona a comunicação durante o projeto?',
        answer:
          'WhatsApp ou Discord para o dia a dia, com atualizações semanais estruturadas e walkthroughs gravados. Registro de decisões em Obsidian. Você sempre sabe exatamente onde o projeto está.',
      },
    ],
  },

  brands: {
    heading: 'STACK & ECOSSISTEMA',
    intro: 'Tecnologias e plataformas sobre as quais os projetos rodam.',
    items: [
      { name: 'Vercel', category: 'Plataforma Cloud' },
      { name: 'Figma', category: 'Design' },
      { name: 'GitHub', category: 'Ferramentas de Dev' },
      { name: 'Obsidian', category: 'Produtividade' },
      { name: 'Firebase', category: 'Dados' },
      { name: 'Claude', category: 'IA' },
      { name: 'GLM', category: 'IA' },
    ],
  },

  tools: {
    heading: 'FERRAMENTAS & SETUP',
    intro: 'Hardware, software e ferramentas que uso todos os dias para construir sistemas.',
    searchPlaceholder: 'Buscar ferramentas...',
    toolsCount: 'ferramentas',
    categories: [
      {
        name: 'Editor & IDE',
        tools: [
          { name: 'VS Code', description: 'principal', emoji: '💻' },
          { name: 'Figma', description: 'para design', emoji: '🎨' },
        ],
      },
      {
        name: 'Frontend',
        tools: [
          { name: 'React / Next.js', description: 'framework', emoji: '⚛️' },
          { name: 'TypeScript', description: 'linguagem', emoji: '🔷' },
          { name: 'Tailwind CSS', description: 'estilização', emoji: '💨' },
        ],
      },
      {
        name: 'Backend',
        tools: [
          { name: 'Golang', description: 'linguagem', emoji: '🔵' },
          { name: 'Node.js', description: 'runtime', emoji: '🟢' },
          { name: 'Bun', description: 'runtime', emoji: '⚪' },
          { name: 'Prisma', description: 'ORM', emoji: '🔷' },
        ],
      },
      {
        name: 'DevOps',
        tools: [
          { name: 'GitHub Actions', description: 'CI/CD', emoji: '🤖' },
          { name: 'Vercel', description: 'deploy', emoji: '▲' },
          { name: 'Railway', description: 'deploy', emoji: '🛤️' },
        ],
      },
      {
        name: 'Hardware',
        tools: [
          { name: 'Acer Aspire A515-45', description: 'notebook', emoji: '💻' },
          { name: 'ELG Dragon War Camuflado (MGDW)', description: 'mouse', emoji: '🖱️' },
        ],
      },
    ],
  },

  journey: {
    heading: 'TRAJETÓRIA',
    intro: 'Três etapas de uma engenharia em construção.',
    currentLabel: 'Atual',
    milestones: [
      {
        year: '2024',
        title: 'Base Técnica & Liderança na Prática',
        description:
          'Fundação Matias Machline (Manaus): formação técnica em Informática e monitoria no clube de programação — ensinar firmou o domínio dos fundamentos.',
      },
      {
        year: '2025',
        title: 'Sistemas Críticos & IoT em Produção',
        description:
          'APIs bancárias em Go com Clean Architecture, PostgreSQL e deploy na Railway; telemetria embarcada com ESP32 e dashboard Next.js/Leaflet com geofencing.',
      },
      {
        year: '2026',
        title: 'Engenharia de Processos & Próximo Ciclo',
        description:
          'Transição para a graduação em Engenharia de Software — consolidando arquitetura, processos e qualidade como prática contínua, não evento pontual.',
        active: true,
      },
    ],
  },

  quotes: {
    heading: 'PALAVRAS QUE ME GUIAM',
    intro: 'Referências que moldam como eu penso sobre design, código e sistemas.',
    items: [
      {
        text: 'Design não é só o que parece e o que se sente. Design é como funciona.',
        author: 'Steve Jobs',
        role: 'Cofundador, Apple',
      },
      {
        text: 'A melhor forma de prever o futuro é inventá-lo.',
        author: 'Alan Kay',
        role: 'Cientista da Computação',
      },
      {
        text: 'Simplicidade é a sofisticação suprema.',
        author: 'Leonardo da Vinci',
        role: 'Polímata & Visionário',
      },
      {
        text: 'Bom design é óbvio. Ótimo design é transparente.',
        author: 'Joe Sparano',
        role: 'Designer Gráfico',
      },
      {
        text: 'Código é poesia.',
        author: 'Vários',
        role: 'Filosofia de Desenvolvedor',
      },
      {
        text: 'Torne simples, mas significativo.',
        author: 'Don Draper',
        role: 'Diretor de Criação (ficção)',
      },
    ],
  },

  contact: {
    heading: 'CONTATO',
    intro: 'Tem um problema técnico ou um sistema para tirar do papel? Me escreva o contexto — retorno em até 24h.',
    emailLabel: 'Email',
    basedInLabel: 'Base em',
    basedInValue: 'Manaus, AM — Brasil',
    connectLabel: 'Redes',
    namePlaceholder: 'Seu nome',
    emailPlaceholder: 'Seu e-mail',
    messagePlaceholder: 'Sua mensagem',
    sendButton: 'Enviar Mensagem',
    sendingButton: 'Enviando...',
    sentButton: 'Enviado!',
    toastRequiredTitle: 'Campos obrigatórios',
    toastRequiredDescription: 'Por favor, preencha todos os campos.',
    toastSuccessTitle: 'Mensagem enviada!',
    toastSuccessDescription: 'Obrigado pelo contato! Retornarei em breve.',
    toastErrorTitle: 'Erro ao enviar',
    toastErrorDescription: 'Não foi possível enviar a mensagem. Verifique sua rede.',
  },

  footer: {
    ctaTitle: 'Vamos construir algo sólido',
    ctaSubtitle: 'Descreva o problema e o contexto — resposta técnica em até 24h.',
    ctaButton: 'Fale comigo',
    nav: [
      { label: 'Início', href: '#home' },
      { label: 'Sobre', href: '#about' },
      { label: 'Projetos', href: '#projects' },
      { label: 'Skills', href: '#skills' },
      { label: 'Ferramentas', href: '#tools' },
      { label: 'Citações', href: '#quotes' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contato', href: '#contact' },
    ],
    copyright: 'Todos os direitos reservados.',
    top: 'Topo',
    madeWith: 'Feito com',
    madeAnd: 'e',
    madeCode: 'código',
  },

  palette: {
    placeholder: 'Buscar seções e ações...',
    empty: 'Nenhum resultado.',
    navigationHeading: 'Navegação',
    actionsHeading: 'Ações',
    navItems: [
      { label: 'Início' },
      { label: 'Sobre' },
      { label: 'Skills' },
      { label: 'Como eu trabalho' },
      { label: 'Projetos' },
      { label: 'Ferramentas' },
      { label: 'Citações' },
      { label: 'FAQ' },
      { label: 'Contato' },
    ],
    toggleTheme: 'Alternar Tema',
    toggleLanguage: 'Alternar Idioma (PT/EN)',
    scrollToTop: 'Voltar ao Topo',
    footerNavigate: 'NAVEGUE COM ↑↓ ENTER',
    footerClose: 'FECHAR',
  },

  shortcuts: {
    title: 'Atalhos de Teclado',
    items: [
      { keys: 'Cmd+K / Ctrl+K', description: 'Paleta de comandos' },
      { keys: '?', description: 'Mostrar/ocultar atalhos' },
      { keys: 'T', description: 'Alternar tema' },
      { keys: 'H', description: 'Ir ao início' },
      { keys: '↑ / ↓', description: 'Navegar seções' },
    ],
  },
};

export type Dict = typeof pt;

const en: Dict = {
  nav: {
    home: 'HOME',
    about: 'ABOUT',
    projects: 'PROJECTS',
    skills: 'SKILLS',
    education: 'EDUCATION',
    faq: 'FAQ',
    contact: 'CONTACT',
  },

  banner: {
    text: 'Available for new projects',
    updated: 'Updated Nov 2026',
  },

  hero: {
    badge: 'Manaus, AM — Brazil • IT Technician (Fundação Matias Machline)',
    headline: 'Software Engineering • Backend Architecture & Distributed Systems • IoT',
    ctaPrimary: 'Get in Touch',
    ctaSecondary: 'View Projects',
    themeToast: 'Theme toggled',
    phrases: [
      'Resilient, scalable software with real business return.',
      'High-concurrency critical backends.',
      'Embedded, real-time hardware in production.',
      'Technical complexity translated into operational efficiency.',
    ],
  },

  about: {
    heading: 'ABOUT',
    intro: 'Software engineering focused on backend systems and IoT — from embedded hardware to critical APIs.',
    bio1:
      'I build resilient, scalable software oriented to real business return. My work connects embedded, real-time hardware to high-concurrency critical backends — translating technical complexity into operational efficiency and tangible deliveries.',
    bio2:
      'Technical foundation from the IT technical program at Fundação Matias Machline (Manaus), including mentoring at the programming club. I work on banking-grade APIs (Go + PostgreSQL, Clean Architecture) and IoT telemetry (ESP32 + Next.js/Leaflet), always with production deployment and observability in mind.',
    availableBadge: 'Available',
    badges: ['3 Projects in production', 'Backend + IoT'],
    currentlyTitle: 'Currently',
    status: [
      { label: 'Available for projects', description: 'Backends, APIs and IoT systems' },
      { label: 'Manaus, AM', description: 'Remote across time zones' },
      { label: 'Response time', description: 'Within 24h' },
    ],
    categories: [
      {
        label: 'Backend & Systems',
        skills: [
          { name: 'Go', level: 84 },
          { name: 'Node.js', level: 78 },
          { name: 'TypeScript', level: 92 },
          { name: 'REST & Clean Architecture', level: 80 },
        ],
      },
      {
        label: 'Frontend & Spatial',
        skills: [
          { name: 'React / Next.js', level: 75 },
          { name: 'Tailwind CSS', level: 90 },
          { name: 'shadcn/ui', level: 78 },
          { name: 'Leaflet / Geolib', level: 72 },
        ],
      },
      {
        label: 'Data & Cloud',
        skills: [
          { name: 'PostgreSQL', level: 80 },
          { name: 'SQLite', level: 82 },
          { name: 'Prisma', level: 65 },
          { name: 'Firebase Auth & RTDB', level: 68 },
        ],
      },
      {
        label: 'Embedded, IoT & Process',
        skills: [
          { name: 'ESP32', level: 80 },
          { name: 'C/C++', level: 78 },
          { name: 'UART / AT', level: 70 },
          { name: 'GPS / GNSS', level: 72 },
        ],
      },
    ],
  },

  skillsRadar: {
    heading: 'SKILLS OVERVIEW',
    intro: 'A breakdown of my competencies across the domains I operate in.',
    axes: [
      { name: 'Backend', value: 83 },
      { name: 'Frontend', value: 73 },
      { name: 'Embedded', value: 80 },
      { name: 'Data', value: 75 },
      { name: 'Cloud', value: 78 },
    ],
    legend: ['70–79: Proficient', '80–89: Advanced', '90+: Expert'],
  },

  stats: {
    heading: 'BY THE NUMBERS',
    intro: 'What is actually live in production — not vanity metrics.',
    items: [
      { value: 3, suffix: '+', label: 'Projects in production' },
      { value: 2, suffix: '', label: 'Cloud Platforms' },
      { value: 4, suffix: '', label: 'Technical domains' },
      { value: 1, suffix: '+', label: 'Year building software' },
    ],
  },

  services: {
    heading: 'WHAT I DO',
    intro: 'Three fronts — backend, embedded IoT and data — with continuous deployment.',
    items: [
      {
        title: 'Backend & Critical APIs',
        description:
          'REST APIs with Go and Node.js under Clean Architecture: ACID transactions, authentication, business-rule validation and structured logging with slog.',
        tags: ['Go', 'Node.js', 'REST'],
      },
      {
        title: 'Frontend & Dashboards',
        description:
          'React/Next.js interfaces with Tailwind and shadcn/ui — including real-time Leaflet maps for telemetry, tracking and geofencing.',
        tags: ['React', 'Next.js', 'Tailwind'],
      },
      {
        title: 'IoT & Embedded Systems',
        description:
          'C++ firmware for ESP32 with GPS/GNSS and LTE/GPRS connectivity — Wi-Fi fallback, UART/AT protocols and geofencing in the field.',
        tags: ['ESP32', 'C++', 'GPS'],
      },
      {
        title: 'Data & Persistence',
        description:
          'Relational modeling on PostgreSQL and SQLite with Prisma ORM — transactional integrity and consistent values (integers, no floating-point drift).',
        tags: ['PostgreSQL', 'SQLite', 'Prisma'],
      },
      {
        title: 'Cloud & Deploy',
        description:
          'Continuous deployment on Railway and Vercel, with isolated environment variables, health checks and observability from day one.',
        tags: ['Railway', 'Vercel'],
      },
      {
        title: 'QA & Reliability',
        description:
          'Business-rule validation, critical-flow testing and error handling with semantic HTTP responses — handled errors are part of the contract.',
        tags: ['Testing', 'Validation'],
      },
    ],
  },

  process: {
    heading: 'HOW I WORK',
    intro: 'A lean four-step process — each stage delivers something verifiable.',
    keyToolsTitle: 'Key Tools',
    steps: [
      {
        title: 'Context & Requirements',
        description:
          'Scope, business rules and constraints defined before the first line of code — ambiguity is not carried forward.',
        details: ['Alignment call', 'Business rules', 'Technical constraints', 'Closed scope'],
        keyTools: ['Obsidian'],
      },
      {
        title: 'Architecture & Technical Design',
        description:
          'Layers with unidirectional dependencies, interface contracts and data model defined — architecture that is cheap to change early.',
        details: ['Clean Architecture', 'Data model', 'API contracts', 'Deploy plan'],
        keyTools: ['Figma'],
      },
      {
        title: 'Implementation & Testing',
        description:
          'Code with structured logging, production middlewares and continuous validation — every critical flow is tested before deploy.',
        details: ['Code sprints', 'Code review', 'Flow QA', 'slog logging'],
        keyTools: ['Go', 'TypeScript'],
      },
      {
        title: 'Deploy & Operations',
        description:
          'Deploy on Railway/Vercel with health checks and observation — a live system is engineering\'s responsibility, not a final event.',
        details: ['Continuous deploy', 'Health checks', 'Monitoring', 'Handoff'],
        keyTools: ['Railway', 'Vercel'],
      },
    ],
  },

  techMarquee: {
    heading: 'TECH STACK',
    intro: 'The technologies behind the projects in production.',
    items: [
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Go', category: 'Backend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'C++', category: 'Embedded' },
      { name: 'ESP32', category: 'Embedded' },
      { name: 'PostgreSQL', category: 'Data' },
      { name: 'SQLite', category: 'Data' },
      { name: 'Prisma', category: 'ORM' },
      { name: 'Firebase', category: 'Data' },
      { name: 'Leaflet', category: 'Mapping' },
      { name: 'Git', category: 'Tools' },
      { name: 'Vercel', category: 'Hosting' },
      { name: 'Railway', category: 'Hosting' },
    ],
  },

  projects: {
    heading: 'PROJECTS',
    intro: 'Systems that are live — a banking backend, IoT telemetry and embedded monitoring.',
    categories: ['All', 'Backend', 'Web & IoT', 'Full-Stack'],
    featuredLabel: 'Featured',
    viewDetails: 'View Details',
    liveLabel: 'Live',
    sourceLabel: 'Source Code',
    highlightsTitle: 'Key Highlights',
    items: [
      {
        name: 'Delta Bank Backend',
        description:
          'Banking API in Go with Clean Architecture and PostgreSQL — PIX transfers, bcrypt authentication and structured logging, live on Railway.',
        fullDescription:
          'RESTful API for a digital banking system in Go 1.22+ with unidirectional-dependency Clean Architecture, PostgreSQL via pgxpool and ACID transactions with integer-cent values. Includes production middlewares — Recovery, Timeout, MaxBodyBytes — JSON structured logging with log/slog and X-Request-ID, plus graceful shutdown. Continuously deployed on Railway, with all routes under the /api prefix.',
        tags: ['Go', 'PostgreSQL', 'Railway'],
        highlights: [
          'Clean Architecture',
          'ACID / pgxpool',
          'PIX & bcrypt',
          'slog JSON + X-Request-ID',
          'Production middlewares',
          'Graceful shutdown',
        ],
      },
      {
        name: 'TALON',
        description:
          'A tracking and location network for endangered Brazilian felines — IoT and embedded technology in service of wildlife conservation.',
        fullDescription:
          'LilyGo T-SIM7000G embedded system (ESP32 + cellular modem + GPS) with Wi-Fi → GPRS/LTE fallback and UART/AT protocols. Next.js dashboard with Leaflet: real-time map, location history, heatmap/tracking and geofencing — with Firebase Auth & RTDB on the backend.',
        tags: ['ESP32', 'Next.js', 'Leaflet'],
        highlights: [
          'LilyGo T-SIM7000G',
          'Wi-Fi → GPRS/LTE fallback',
          'UART / AT',
          'Firebase Auth & RTDB',
          'Geofencing',
          'Heatmap & history',
        ],
      },
      {
        name: 'ChocaSystem',
        description:
          'Monitoring of variables in an egg incubator, with heater and humidifier control plus a presence detector.',
        fullDescription:
          'Embedded system with heaters and humidifiers driven by an ESP32, PID control for thermal regulation and a real-time dashboard for temperature, humidity and presence.',
        tags: ['ESP32', 'PID', 'Next.js'],
        highlights: ['PID control', 'Sensors', 'Real-time dashboard', 'Presence detector'],
      },
    ],
  },

  education: {
    heading: 'EDUCATION',
    degree: 'IT Technical Diploma',
    school: 'Fundação Matias Machline',
    location: 'Manaus, AM — Brazil',
    period: '2024 – 2026',
    bullets: [
      'Full-stack web and mobile technical program focused on embedded systems integration',
      'Mentoring at the programming club — structured teaching of code fundamentals',
    ],
  },

  faq: {
    heading: 'FAQ',
    intro: 'Common questions about working together. Can\'t find what you\'re looking for? Reach out directly.',
    items: [
      {
        question: 'What is your typical project timeline?',
        answer:
          'It depends on the domain: a REST API with well-defined rules runs 2–4 weeks; systems with embedded hardware need physical validation windows and usually take 6–10 weeks. The fixed deadline comes out of the first scope alignment.',
      },
      {
        question: 'What does your process look like, from requirements to deploy?',
        answer:
          'Context and business rules first; architecture with unidirectional dependencies and interface contracts; implementation with structured logging and critical-flow QA; deploy on Railway/Vercel with health checks. Every stage delivers something verifiable.',
      },
      {
        question: 'Can you work with existing systems or design systems?',
        answer:
          'Yes — legacy codebase, a Figma design system or infrastructure constraints: I adapt to what already exists and avoid rewriting what already works.',
      },
      {
        question: 'How does communication work during a project?',
        answer:
          'WhatsApp or Discord for day-to-day, with structured weekly updates and recorded walkthroughs. Decision log in Obsidian. You always know exactly where the project stands.',
      },
    ],
  },

  brands: {
    heading: 'STACK & ECOSYSTEM',
    intro: 'The technologies and platforms my projects run on.',
    items: [
      { name: 'Vercel', category: 'Cloud Platform' },
      { name: 'Figma', category: 'Design' },
      { name: 'GitHub', category: 'Developer Tools' },
      { name: 'Obsidian', category: 'Productivity' },
      { name: 'Firebase', category: 'Database' },
      { name: 'Claude', category: 'AI' },
      { name: 'GLM', category: 'AI' },
    ],
  },

  tools: {
    heading: 'TOOLS & SETUP',
    intro: 'The hardware, software and tools I use every day to build systems.',
    searchPlaceholder: 'Search tools...',
    toolsCount: 'tools',
    categories: [
      {
        name: 'Editor & IDE',
        tools: [
          { name: 'VS Code', description: 'primary', emoji: '💻' },
          { name: 'Figma', description: 'for design work', emoji: '🎨' },
        ],
      },
      {
        name: 'Frontend',
        tools: [
          { name: 'React / Next.js', description: 'framework', emoji: '⚛️' },
          { name: 'TypeScript', description: 'language', emoji: '🔷' },
          { name: 'Tailwind CSS', description: 'styling', emoji: '💨' },
        ],
      },
      {
        name: 'Backend',
        tools: [
          { name: 'Golang', description: 'language', emoji: '🔵' },
          { name: 'Node.js', description: 'runtime', emoji: '🟢' },
          { name: 'Bun', description: 'runtime', emoji: '⚪' },
          { name: 'Prisma', description: 'ORM', emoji: '🔷' },
        ],
      },
      {
        name: 'DevOps',
        tools: [
          { name: 'GitHub Actions', description: 'CI/CD', emoji: '🤖' },
          { name: 'Vercel', description: 'deployment', emoji: '▲' },
          { name: 'Railway', description: 'deployment', emoji: '🛤️' },
        ],
      },
      {
        name: 'Hardware',
        tools: [
          { name: 'Acer Aspire A515-45', description: 'laptop', emoji: '💻' },
          { name: 'ELG Dragon War Camuflado (MGDW)', description: 'mouse', emoji: '🖱️' },
        ],
      },
    ],
  },

  journey: {
    heading: 'MY JOURNEY',
    intro: 'Three stages of engineering in the making.',
    currentLabel: 'Current',
    milestones: [
      {
        year: '2024',
        title: 'Technical Foundation & Hands-On Leadership',
        description:
          'Fundação Matias Machline (Manaus): technical IT program and mentoring at the programming club — teaching cemented the fundamentals.',
      },
      {
        year: '2025',
        title: 'Critical Systems & IoT in Production',
        description:
          'Banking APIs in Go with Clean Architecture, PostgreSQL and Railway deploy; embedded telemetry with ESP32 and a Next.js/Leaflet dashboard with geofencing.',
      },
      {
        year: '2026',
        title: 'Process Engineering & Next Cycle',
        description:
          'Transition into a Software Engineering degree — consolidating architecture, process and quality as continuous practice, not a one-off event.',
        active: true,
      },
    ],
  },

  quotes: {
    heading: 'WORDS I LIVE BY',
    intro: 'References that shape how I think about design, code and systems.',
    items: [
      {
        text: 'Design is not just what it looks like and feels like. Design is how it works.',
        author: 'Steve Jobs',
        role: 'Co-founder, Apple',
      },
      {
        text: 'The best way to predict the future is to invent it.',
        author: 'Alan Kay',
        role: 'Computer Scientist',
      },
      {
        text: 'Simplicity is the ultimate sophistication.',
        author: 'Leonardo da Vinci',
        role: 'Polymath & Visionary',
      },
      {
        text: 'Good design is obvious. Great design is transparent.',
        author: 'Joe Sparano',
        role: 'Graphic Designer',
      },
      {
        text: 'Code is poetry.',
        author: 'Various',
        role: 'Developer Philosophy',
      },
      {
        text: 'Make it simple, but significant.',
        author: 'Don Draper',
        role: 'Creative Director (fictional)',
      },
    ],
  },

  contact: {
    heading: 'GET IN TOUCH',
    intro: 'Got a technical problem or a system that needs to get built? Send me the context — I reply within 24h.',
    emailLabel: 'Email',
    basedInLabel: 'Based in',
    basedInValue: 'Manaus, AM — Brazil',
    connectLabel: 'Connect',
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'Your Email',
    messagePlaceholder: 'Your Message',
    sendButton: 'Send Message',
    sendingButton: 'Sending...',
    sentButton: 'Sent!',
    toastRequiredTitle: 'Required fields',
    toastRequiredDescription: 'Please fill in all fields.',
    toastSuccessTitle: 'Message sent!',
    toastSuccessDescription: 'Thanks for reaching out! I will reply soon.',
    toastErrorTitle: 'Failed to send',
    toastErrorDescription: 'Could not send the message. Check your network.',
  },

  footer: {
    ctaTitle: 'Let\'s build something solid',
    ctaSubtitle: 'Describe the problem and the context — technical reply within 24h.',
    ctaButton: 'Get in Touch',
    nav: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Skills', href: '#skills' },
      { label: 'Tools', href: '#tools' },
      { label: 'Quotes', href: '#quotes' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    copyright: 'All rights reserved.',
    top: 'Top',
    madeWith: 'Made with',
    madeAnd: 'and',
    madeCode: 'code',
  },

  palette: {
    placeholder: 'Search sections, actions...',
    empty: 'No results found.',
    navigationHeading: 'Navigation',
    actionsHeading: 'Actions',
    navItems: [
      { label: 'Home' },
      { label: 'About' },
      { label: 'Skills' },
      { label: 'How I Work' },
      { label: 'Projects' },
      { label: 'Tools' },
      { label: 'Quotes' },
      { label: 'FAQ' },
      { label: 'Contact' },
    ],
    toggleTheme: 'Toggle Theme',
    toggleLanguage: 'Toggle Language (PT/EN)',
    scrollToTop: 'Scroll to Top',
    footerNavigate: 'NAVIGATE WITH ↑↓ ENTER',
    footerClose: 'CLOSE',
  },

  shortcuts: {
    title: 'Keyboard Shortcuts',
    items: [
      { keys: 'Cmd+K / Ctrl+K', description: 'Command Palette' },
      { keys: '?', description: 'Toggle Shortcuts' },
      { keys: 'T', description: 'Toggle Theme' },
      { keys: 'H', description: 'Scroll to Home' },
      { keys: '↑ / ↓', description: 'Navigate Sections' },
    ],
  },
};

export const translations: Record<Locale, Dict> = { pt, en };
