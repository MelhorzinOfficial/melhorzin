# 📋 Product Backlog

## Melhorzin - Comunidade Dev

---

## 📊 Status Overview

| Sprint   | Status          | Período     | Foco                       |
| -------- | --------------- | ----------- | -------------------------- |
| Sprint 1 | 🔴 Não Iniciado | Semana 1-2  | Autenticação GitHub        |
| Sprint 2 | ⚪ Planejado    | Semana 3-4  | Landing + Membros + Perfil |
| Sprint 3 | ⚪ Planejado    | Semana 5-6  | Sistema de Blog            |
| Sprint 4 | ⚪ Planejado    | Semana 7-8  | Biblioteca de Recursos     |
| Sprint 5 | ⚪ Planejado    | Semana 9-10 | Polish + Deploy            |

**Legenda:** 🔴 Não Iniciado | 🟡 Em Progresso | 🟢 Concluído | ⚪ Planejado

---

## 🎯 Sprint 1: Autenticação GitHub

**Objetivo:** Implementar sistema completo de autenticação via GitHub OAuth

**Duração:** 2 semanas

### User Stories

#### US-001: Login com GitHub

**Como** visitante  
**Quero** fazer login usando minha conta do GitHub  
**Para** acessar as funcionalidades da plataforma

**Critérios de Aceite:**

- [ ] Botão "Entrar com GitHub" na página inicial
- [ ] Redirecionamento para autorização do GitHub
- [ ] Callback processa e cria usuário no banco
- [ ] JWT é gerado e armazenado de forma segura
- [ ] Usuário é redirecionado para dashboard

**Tasks:**

- [ ] [BE] Configurar módulo de auth no NestJS
- [ ] [BE] Implementar GitHub OAuth Strategy (Passport)
- [ ] [BE] Criar endpoint de callback
- [ ] [BE] Implementar geração de JWT
- [ ] [BE] Criar tabela de usuários (Prisma)
- [ ] [FE] Criar página de login
- [ ] [FE] Implementar botão OAuth
- [ ] [FE] Criar hook useAuth
- [ ] [FE] Implementar armazenamento de token

---

#### US-002: Persistência de Sessão

**Como** usuário logado  
**Quero** manter minha sessão ativa  
**Para** não precisar fazer login repetidamente

**Critérios de Aceite:**

- [ ] Sessão dura 7 dias por padrão
- [ ] Refresh token implementado
- [ ] Token é validado em cada requisição
- [ ] Logout limpa todos os tokens

**Tasks:**

- [ ] [BE] Implementar refresh token
- [ ] [BE] Criar guard de autenticação
- [ ] [BE] Endpoint /auth/me para validar sessão
- [ ] [FE] Interceptor para refresh automático
- [ ] [FE] Redirect para login quando expirado

---

#### US-003: Logout

**Como** usuário logado  
**Quero** poder sair da minha conta  
**Para** proteger minha sessão

**Critérios de Aceite:**

- [ ] Botão de logout visível quando logado
- [ ] Tokens são invalidados no backend
- [ ] Usuário é redirecionado para home
- [ ] Estado local é limpo

**Tasks:**

- [ ] [BE] Endpoint POST /auth/logout
- [ ] [FE] Implementar função de logout
- [ ] [FE] Limpar estado e tokens

---

## 🎯 Sprint 2: Landing Page + Membros + Perfil

**Objetivo:** Criar a página inicial e sistema de showcase de membros

**Duração:** 2 semanas

### User Stories

#### US-004: Landing Page

**Como** visitante  
**Quero** ver uma página inicial atrativa  
**Para** entender o que é a comunidade Melhorzin

**Critérios de Aceite:**

- [ ] Hero section com título e CTA
- [ ] Seção "Sobre a comunidade"
- [ ] Seção de estatísticas
- [ ] Showcase de membros (carrossel)
- [ ] Footer com links
- [ ] 100% responsivo

**Tasks:**

- [ ] [FE] Criar componente Hero
- [ ] [FE] Criar componente AboutSection
- [ ] [FE] Criar componente StatsSection
- [ ] [FE] Criar componente MembersCarousel
- [ ] [FE] Criar componente Footer
- [ ] [FE] Compor página inicial

---

#### US-005: Showcase de Membros

**Como** visitante  
**Quero** ver os membros destacados da comunidade  
**Para** conhecer quem faz parte

**Critérios de Aceite:**

- [ ] Carrossel com cards de membros
- [ ] Card mostra foto, nome, bio curta, skills
- [ ] Navegação por setas
- [ ] Autoplay com pausa no hover
- [ ] Link para perfil completo

**Tasks:**

- [ ] [BE] Endpoint GET /users (paginado)
- [ ] [BE] Flag "featured" para destaque
- [ ] [FE] Componente MemberCard
- [ ] [FE] Componente Carousel
- [ ] [FE] Integrar com API

---

#### US-006: Perfil de Usuário

**Como** membro  
**Quero** ter um perfil público  
**Para** mostrar quem sou e o que faço

**Critérios de Aceite:**

- [ ] Página /members/[username]
- [ ] Exibe dados do GitHub (nome, avatar, bio)
- [ ] Lista de skills editável
- [ ] Links para redes sociais
- [ ] Seção de repositórios públicos

**Tasks:**

- [ ] [BE] Endpoint GET /users/:username
- [ ] [BE] Endpoint PATCH /users/:id
- [ ] [FE] Página de perfil público
- [ ] [FE] Componente EditProfile (modal)
- [ ] [FE] Integrar GitHub repos API

---

## 🎯 Sprint 3: Sistema de Blog

**Objetivo:** Implementar plataforma de blog para artigos da comunidade

**Duração:** 2 semanas

### User Stories

#### US-007: Criar Post

**Como** membro  
**Quero** escrever e publicar artigos  
**Para** compartilhar conhecimento com a comunidade

**Critérios de Aceite:**

- [ ] Editor Markdown com preview
- [ ] Upload de imagem de capa
- [ ] Sistema de tags
- [ ] Salvar rascunho
- [ ] Publicar artigo

**Tasks:**

- [ ] [BE] CRUD de posts
- [ ] [BE] Sistema de tags
- [ ] [BE] Upload de imagens (S3/Cloudinary)
- [ ] [FE] Editor Markdown
- [ ] [FE] Preview em tempo real
- [ ] [FE] Formulário de criação

---

#### US-008: Listar e Ler Posts

**Como** visitante  
**Quero** navegar pelos artigos do blog  
**Para** aprender com a comunidade

**Critérios de Aceite:**

- [ ] Listagem paginada de posts
- [ ] Filtro por tags
- [ ] Busca por título/conteúdo
- [ ] Página individual do post
- [ ] Tempo de leitura estimado

**Tasks:**

- [ ] [BE] Endpoint GET /posts (filtros, paginação)
- [ ] [BE] Endpoint GET /posts/:slug
- [ ] [FE] Página de listagem
- [ ] [FE] Página do post
- [ ] [FE] Componente de busca/filtro

---

#### US-009: Interagir com Posts

**Como** membro  
**Quero** curtir e comentar posts  
**Para** interagir com o conteúdo

**Critérios de Aceite:**

- [ ] Botão de like com contador
- [ ] Sistema de comentários
- [ ] Respostas a comentários
- [ ] Notificação para autor

**Tasks:**

- [ ] [BE] Sistema de likes
- [ ] [BE] CRUD de comentários
- [ ] [FE] Componente LikeButton
- [ ] [FE] Componente Comments

---

## 🎯 Sprint 4: Biblioteca de Recursos

**Objetivo:** Criar curadoria de ferramentas e recursos úteis

**Duração:** 2 semanas

### User Stories

#### US-010: Listar Recursos

**Como** visitante  
**Quero** navegar por uma biblioteca de recursos  
**Para** descobrir ferramentas úteis

**Critérios de Aceite:**

- [ ] Listagem categorizada
- [ ] Filtro por categoria/tags
- [ ] Busca por nome
- [ ] Card com descrição e link

**Tasks:**

- [ ] [BE] CRUD de recursos
- [ ] [BE] Sistema de categorias
- [ ] [FE] Página de biblioteca
- [ ] [FE] Componente ResourceCard
- [ ] [FE] Filtros e busca

---

#### US-011: Sugerir Recurso

**Como** membro  
**Quero** sugerir novos recursos  
**Para** contribuir com a comunidade

**Critérios de Aceite:**

- [ ] Formulário de sugestão
- [ ] Fila de moderação
- [ ] Notificação de aprovação

**Tasks:**

- [ ] [BE] Endpoint POST /resources
- [ ] [BE] Flag "approved"
- [ ] [BE] Painel de moderação
- [ ] [FE] Formulário de sugestão
- [ ] [FE] Status da sugestão

---

## 🎯 Sprint 5: Polish + Deploy

**Objetivo:** Finalizar, testar e fazer deploy da aplicação

**Duração:** 2 semanas

### Tasks

- [ ] Testes E2E (Playwright)
- [ ] Testes unitários críticos
- [ ] Otimização de performance
- [ ] SEO (meta tags, sitemap)
- [ ] Configurar CI/CD
- [ ] Deploy frontend (Vercel)
- [ ] Deploy backend (Railway)
- [ ] Configurar domínio
- [ ] Monitoramento (Sentry)
- [ ] Documentação final

---

## 📝 Backlog Futuro (Ice Box)

| ID   | Feature           | Prioridade | Estimativa |
| ---- | ----------------- | ---------- | ---------- |
| F007 | Fórum/Discussões  | Média      | 2 sprints  |
| F008 | Sistema de Badges | Baixa      | 1 sprint   |
| F009 | Eventos/Meetups   | Média      | 1 sprint   |
| F010 | Newsletter        | Baixa      | 0.5 sprint |
| F011 | Dark Mode         | Baixa      | 0.5 sprint |
| F012 | PWA               | Baixa      | 1 sprint   |
| F013 | API Pública       | Baixa      | 1 sprint   |
| F014 | Gamification      | Média      | 2 sprints  |

---

## 📊 Velocity Tracking

| Sprint | Story Points Planejados | Entregues | %   |
| ------ | ----------------------- | --------- | --- |
| 1      | -                       | -         | -   |
| 2      | -                       | -         | -   |
| 3      | -                       | -         | -   |
| 4      | -                       | -         | -   |
| 5      | -                       | -         | -   |

---

_Última atualização: 2025-12-09_
