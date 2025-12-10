# 🚀 Melhorzin - Comunidade Dev

> O lugar onde os Melhorzin se encontram, aprendem e evoluem juntos

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## 📖 Sobre o Projeto

O **Melhorzin** é uma plataforma fullstack para a comunidade de desenvolvedores MLZ, criada 100% com auxílio de IA. Um hub centralizado onde desenvolvedores podem se conectar, compartilhar conhecimento, descobrir ferramentas úteis e crescer juntos.

### ✨ Funcionalidades

- 🎠 **Showcase de Membros** - Carrossel com devs da comunidade
- 📝 **Blog** - Tutoriais e artigos da comunidade
- 💬 **Fórum** - Discussões e Q&A
- 📚 **Biblioteca de Recursos** - Curadoria de ferramentas e frameworks
- 🔐 **Login com GitHub** - Autenticação simplificada

---

## 🏗️ Estrutura do Projeto

```
melhorzin/
├── frontend/          # Next.js 15 + shadcn/ui
├── backend/           # NestJS + Prisma
├── docs/              # Documentação do projeto
│   ├── PRD.md         # Product Requirements Document
│   ├── ARCHITECTURE.md
│   ├── BACKLOG.md
│   ├── epics/         # Epics e User Stories
│   └── sprint-artifacts/
└── README.md
```

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 20+
- Bun (ou npm/yarn/pnpm)
- PostgreSQL
- Redis (opcional)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/MelhorzinOfficial/melhorzin.git
cd melhorzin

# Frontend
cd frontend
bun install
bun dev

# Backend (em outro terminal)
cd backend
npm install
npm run start:dev
```

### Variáveis de Ambiente

```bash
# Backend (.env)
DATABASE_URL="postgresql://..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
JWT_SECRET="..."

# Frontend (.env.local)
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

---

## 📚 Documentação

| Documento                             | Descrição             |
| ------------------------------------- | --------------------- |
| [PRD](./docs/PRD.md)                  | Requisitos do produto |
| [Arquitetura](./docs/ARCHITECTURE.md) | Arquitetura técnica   |
| [Backlog](./docs/BACKLOG.md)          | Backlog e sprints     |
| [Epics](./docs/epics/)                | Epics e User Stories  |

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** TanStack Query
- **Animações:** Framer Motion

### Backend

- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Cache:** Redis

---

## 📅 Roadmap

- [x] Estrutura inicial do projeto
- [x] Documentação base (PRD, Arquitetura)
- [ ] **Sprint 1:** Autenticação GitHub
- [ ] **Sprint 2:** Membros + Landing Page
- [ ] **Sprint 3:** Sistema de Blog
- [ ] **Sprint 4:** Biblioteca de Recursos

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o guia de contribuição antes de submeter PRs.

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Time

Feito com 💜 pela comunidade **Melhorzin**

---

_"Juntos somos melhores, juntos somos Melhorzin"_ 🚀
