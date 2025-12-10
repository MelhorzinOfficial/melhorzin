# 🏗️ Arquitetura do Sistema

## Melhorzin - Comunidade Dev

---

## 1. Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Next.js 15 (App Router)                     │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │    │
│  │  │   Pages     │  │  Components │  │   Hooks/Utils   │  │    │
│  │  │  (app/)     │  │  (shadcn)   │  │   (TanStack)    │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ REST API / HTTP
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          BACKEND                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    NestJS                                │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐  │    │
│  │  │ Modules  │  │ Services │  │  Guards  │  │  DTOs   │  │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘  │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Prisma ORM
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATABASE                                  │
│  ┌─────────────────────┐         ┌────────────────────────┐     │
│  │    PostgreSQL       │         │        Redis           │     │
│  │   (Dados principais)│         │  (Cache/Sessions)      │     │
│  └─────────────────────┘         └────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Stack Tecnológica

### 2.1 Frontend

| Tecnologia      | Versão | Propósito                      |
| --------------- | ------ | ------------------------------ |
| Next.js         | 15.x   | Framework React com App Router |
| React           | 19.x   | Biblioteca UI                  |
| TypeScript      | 5.x    | Type safety                    |
| Tailwind CSS    | 3.4.x  | Estilização utility-first      |
| shadcn/ui       | latest | Componentes UI                 |
| TanStack Query  | 5.x    | Server state management        |
| Framer Motion   | 11.x   | Animações                      |
| Zod             | 3.x    | Validação de schemas           |
| React Hook Form | 7.x    | Gerenciamento de formulários   |

### 2.2 Backend

| Tecnologia      | Versão | Propósito                |
| --------------- | ------ | ------------------------ |
| NestJS          | 10.x   | Framework Node.js        |
| TypeScript      | 5.x    | Type safety              |
| Prisma          | 5.x    | ORM                      |
| PostgreSQL      | 16.x   | Banco de dados principal |
| Redis           | 7.x    | Cache e sessões          |
| Passport        | 0.7.x  | Autenticação             |
| JWT             | -      | Tokens de autenticação   |
| class-validator | -      | Validação de DTOs        |

---

## 3. Estrutura de Pastas

### 3.1 Frontend

```
frontend/
├── public/                    # Assets estáticos
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/                   # App Router (páginas)
│   │   ├── (auth)/            # Grupo de rotas de auth
│   │   │   ├── login/
│   │   │   └── callback/
│   │   ├── (main)/            # Grupo de rotas principais
│   │   │   ├── blog/
│   │   │   ├── members/
│   │   │   ├── resources/
│   │   │   └── profile/
│   │   ├── api/               # API Routes (se necessário)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/            # Header, Footer, Sidebar
│   │   ├── features/          # Componentes específicos
│   │   │   ├── auth/
│   │   │   ├── blog/
│   │   │   ├── members/
│   │   │   └── resources/
│   │   └── shared/            # Componentes compartilhados
│   ├── hooks/                 # Custom hooks
│   │   ├── use-auth.ts
│   │   ├── use-mobile.ts
│   │   └── queries/           # TanStack Query hooks
│   ├── lib/                   # Utilitários
│   │   ├── api.ts             # Cliente API
│   │   ├── auth.ts            # Helpers de auth
│   │   └── utils.ts
│   ├── types/                 # TypeScript types
│   │   ├── user.ts
│   │   ├── post.ts
│   │   └── resource.ts
│   └── config/                # Configurações
│       └── site.ts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### 3.2 Backend

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/              # Módulo de autenticação
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   └── github.strategy.ts
│   │   │   ├── guards/
│   │   │   │   └── jwt-auth.guard.ts
│   │   │   └── dto/
│   │   ├── users/             # Módulo de usuários
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   └── dto/
│   │   ├── posts/             # Módulo de blog
│   │   │   ├── posts.module.ts
│   │   │   ├── posts.controller.ts
│   │   │   ├── posts.service.ts
│   │   │   └── dto/
│   │   └── resources/         # Módulo de recursos
│   │       ├── resources.module.ts
│   │       ├── resources.controller.ts
│   │       ├── resources.service.ts
│   │       └── dto/
│   ├── common/                # Código compartilhado
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── config/                # Configurações
│   │   ├── database.config.ts
│   │   └── auth.config.ts
│   ├── prisma/                # Prisma
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── nest-cli.json
└── tsconfig.json
```

---

## 4. Modelo de Dados

### 4.1 Schema Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  githubId      String    @unique
  username      String    @unique
  email         String?   @unique
  name          String?
  avatar        String?
  bio           String?
  location      String?
  website       String?
  githubUrl     String?
  skills        String[]
  role          Role      @default(MEMBER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  posts         Post[]
  comments      Comment[]
  resources     Resource[]
  likes         Like[]

  @@map("users")
}

enum Role {
  MEMBER
  MODERATOR
  ADMIN
}

model Post {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  content     String
  excerpt     String?
  coverImage  String?
  published   Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  authorId    String
  author      User      @relation(fields: [authorId], references: [id])

  tags        Tag[]
  comments    Comment[]
  likes       Like[]

  @@map("posts")
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  slug  String @unique
  posts Post[]

  @@map("tags")
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  authorId  String
  author    User     @relation(fields: [authorId], references: [id])

  postId    String
  post      Post     @relation(fields: [postId], references: [id])

  parentId  String?
  parent    Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies   Comment[] @relation("CommentReplies")

  @@map("comments")
}

model Like {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())

  userId    String
  user      User     @relation(fields: [userId], references: [id])

  postId    String?
  post      Post?    @relation(fields: [postId], references: [id])

  @@unique([userId, postId])
  @@map("likes")
}

model Resource {
  id          String   @id @default(cuid())
  name        String
  description String
  url         String
  category    String
  tags        String[]
  approved    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  submittedById String
  submittedBy   User   @relation(fields: [submittedById], references: [id])

  @@map("resources")
}
```

---

## 5. API Endpoints

### 5.1 Autenticação

| Método | Endpoint                    | Descrição           |
| ------ | --------------------------- | ------------------- |
| GET    | `/api/auth/github`          | Inicia OAuth GitHub |
| GET    | `/api/auth/github/callback` | Callback OAuth      |
| POST   | `/api/auth/refresh`         | Refresh token       |
| POST   | `/api/auth/logout`          | Logout              |
| GET    | `/api/auth/me`              | Usuário atual       |

### 5.2 Usuários

| Método | Endpoint               | Descrição        |
| ------ | ---------------------- | ---------------- |
| GET    | `/api/users`           | Lista usuários   |
| GET    | `/api/users/:id`       | Busca usuário    |
| PATCH  | `/api/users/:id`       | Atualiza perfil  |
| GET    | `/api/users/:id/posts` | Posts do usuário |

### 5.3 Posts

| Método | Endpoint              | Descrição     |
| ------ | --------------------- | ------------- |
| GET    | `/api/posts`          | Lista posts   |
| POST   | `/api/posts`          | Cria post     |
| GET    | `/api/posts/:slug`    | Busca post    |
| PATCH  | `/api/posts/:id`      | Atualiza post |
| DELETE | `/api/posts/:id`      | Remove post   |
| POST   | `/api/posts/:id/like` | Curtir post   |

### 5.4 Recursos

| Método | Endpoint                     | Descrição      |
| ------ | ---------------------------- | -------------- |
| GET    | `/api/resources`             | Lista recursos |
| POST   | `/api/resources`             | Sugere recurso |
| PATCH  | `/api/resources/:id/approve` | Aprova recurso |

---

## 6. Autenticação & Autorização

### 6.1 Fluxo OAuth GitHub

```
1. Usuário clica "Login com GitHub"
2. Frontend redireciona para /api/auth/github
3. Backend redireciona para GitHub OAuth
4. Usuário autoriza no GitHub
5. GitHub redireciona para /api/auth/github/callback
6. Backend:
   a. Recebe código de autorização
   b. Troca código por access token
   c. Busca dados do usuário no GitHub
   d. Cria/atualiza usuário no banco
   e. Gera JWT (access + refresh tokens)
   f. Redireciona para frontend com tokens
7. Frontend armazena tokens e redireciona para dashboard
```

### 6.2 Estrutura do JWT

```json
{
	"sub": "user_cuid",
	"username": "johndoe",
	"role": "MEMBER",
	"iat": 1702123456,
	"exp": 1702209856
}
```

---

## 7. Caching Strategy

### 7.1 Níveis de Cache

| Dado             | TTL    | Estratégia  |
| ---------------- | ------ | ----------- |
| Sessão usuário   | 7 dias | Redis       |
| Lista de membros | 5 min  | Redis + SWR |
| Posts populares  | 10 min | Redis       |
| Recursos         | 1 hora | Redis       |
| Assets estáticos | 1 ano  | CDN/Browser |

---

## 8. Deploy & Infraestrutura

### 8.1 Ambiente de Desenvolvimento

```yaml
# docker-compose.yml
services:
 postgres:
  image: postgres:16
  ports: ['5432:5432']

 redis:
  image: redis:7
  ports: ['6379:6379']
```

### 8.2 Produção (Sugestão)

- **Frontend:** Vercel
- **Backend:** Railway / Render
- **Database:** Supabase / Neon
- **Cache:** Upstash Redis
- **CDN:** Cloudflare

---

## 9. Considerações de Segurança

- [ ] HTTPS em todos os endpoints
- [ ] CORS configurado corretamente
- [ ] Rate limiting (100 req/min por IP)
- [ ] Helmet.js no backend
- [ ] Sanitização de inputs (XSS)
- [ ] Prepared statements (SQL Injection)
- [ ] JWT em httpOnly cookies
- [ ] Refresh token rotation
- [ ] Logs de auditoria para ações sensíveis

---

## 10. Monitoramento

- **Logs:** Estruturados em JSON (Winston/Pino)
- **APM:** Sentry para erros
- **Métricas:** Prometheus + Grafana (futuro)
- **Uptime:** UptimeRobot / BetterStack
