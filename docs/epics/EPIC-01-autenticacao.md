# 🔐 Epic 01: Autenticação
## Sistema de Autenticação via GitHub OAuth

---

## 📋 Visão Geral

**Epic ID:** EPIC-001  
**Sprint:** 1  
**Prioridade:** Alta  
**Estimativa:** 2 semanas  

### Objetivo
Implementar um sistema completo de autenticação utilizando GitHub OAuth, permitindo que usuários da comunidade acessem a plataforma usando suas contas do GitHub existentes.

### Benefícios
- Onboarding simplificado (sem criar nova conta)
- Dados do perfil importados automaticamente
- Integração natural com o ecossistema dev
- Segurança delegada ao GitHub

---

## 📖 User Stories

### US-001: Login com GitHub ⭐ Core

**Narrativa:**
> Como visitante do Melhorzin  
> Quero fazer login usando minha conta do GitHub  
> Para acessar as funcionalidades exclusivas para membros

**Critérios de Aceite:**
```gherkin
Cenário: Login bem-sucedido via GitHub
  Dado que estou na página inicial
  Quando clico no botão "Entrar com GitHub"
  Então sou redirecionado para a autorização do GitHub
  E após autorizar, retorno para o Melhorzin
  E vejo meu avatar no header
  E estou autenticado na plataforma

Cenário: Primeiro acesso
  Dado que nunca acessei o Melhorzin antes
  Quando faço login via GitHub pela primeira vez
  Então uma conta é criada automaticamente
  E meus dados do GitHub são importados (nome, avatar, bio)

Cenário: Acesso recorrente
  Dado que já tenho conta no Melhorzin
  Quando faço login via GitHub
  Então minha conta existente é reconhecida
  E minha sessão anterior é restaurada
```

**Tasks Técnicas:**

| ID | Task | Responsável | Status |
|----|------|-------------|--------|
| T001 | Configurar Passport GitHub Strategy no NestJS | Backend | ⬜ |
| T002 | Criar endpoint GET /api/auth/github | Backend | ⬜ |
| T003 | Criar endpoint GET /api/auth/github/callback | Backend | ⬜ |
| T004 | Implementar criação/atualização de usuário | Backend | ⬜ |
| T005 | Gerar JWT access token | Backend | ⬜ |
| T006 | Criar página /login | Frontend | ⬜ |
| T007 | Implementar botão GitHub OAuth | Frontend | ⬜ |
| T008 | Criar AuthContext/Provider | Frontend | ⬜ |
| T009 | Armazenar token (httpOnly cookie) | Full Stack | ⬜ |

---

### US-002: Persistência de Sessão

**Narrativa:**
> Como usuário autenticado  
> Quero que minha sessão permaneça ativa  
> Para não precisar fazer login toda vez que acesso

**Critérios de Aceite:**
```gherkin
Cenário: Sessão mantida após fechar browser
  Dado que estou logado
  Quando fecho o navegador e reabro
  E acesso o Melhorzin novamente
  Então ainda estou logado

Cenário: Token expira após 7 dias
  Dado que estou logado há mais de 7 dias sem atividade
  Quando acesso uma página protegida
  Então sou redirecionado para o login
  E vejo mensagem "Sessão expirada, faça login novamente"

Cenário: Refresh token automático
  Dado que meu access token está prestes a expirar
  Quando faço uma requisição à API
  Então um novo access token é gerado automaticamente
  E não sou deslogado
```

**Tasks Técnicas:**

| ID | Task | Status |
|----|------|--------|
| T010 | Implementar refresh token no backend | ⬜ |
| T011 | Criar endpoint POST /api/auth/refresh | ⬜ |
| T012 | Implementar interceptor de refresh no frontend | ⬜ |
| T013 | Criar middleware de validação de token | ⬜ |

---

### US-003: Logout

**Narrativa:**
> Como usuário autenticado  
> Quero poder sair da minha conta  
> Para proteger minha sessão em dispositivos compartilhados

**Critérios de Aceite:**
```gherkin
Cenário: Logout bem-sucedido
  Dado que estou logado
  Quando clico em "Sair" no menu do usuário
  Então minha sessão é encerrada
  E sou redirecionado para a página inicial
  E vejo o botão "Entrar" no header

Cenário: Tokens invalidados
  Dado que fiz logout
  Quando tento acessar uma página protegida diretamente
  Então sou redirecionado para o login
```

**Tasks Técnicas:**

| ID | Task | Status |
|----|------|--------|
| T014 | Criar endpoint POST /api/auth/logout | ⬜ |
| T015 | Invalidar tokens no Redis | ⬜ |
| T016 | Implementar função logout no frontend | ⬜ |
| T017 | Limpar estado de autenticação | ⬜ |

---

### US-004: Validação de Sessão

**Narrativa:**
> Como desenvolvedor  
> Quero um endpoint para validar a sessão atual  
> Para verificar se o usuário está autenticado

**Critérios de Aceite:**
```gherkin
Cenário: Sessão válida
  Dado que tenho um token válido
  Quando faço GET /api/auth/me
  Então recebo status 200
  E recebo os dados do usuário atual

Cenário: Sessão inválida
  Dado que tenho um token inválido ou expirado
  Quando faço GET /api/auth/me
  Então recebo status 401
```

**Tasks Técnicas:**

| ID | Task | Status |
|----|------|--------|
| T018 | Criar endpoint GET /api/auth/me | ⬜ |
| T019 | Criar JwtAuthGuard | ⬜ |
| T020 | Implementar hook useAuth no frontend | ⬜ |

---

## 🔧 Especificações Técnicas

### Fluxo de Autenticação

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Browser │     │Frontend │     │ Backend │     │ GitHub  │
└────┬────┘     └────┬────┘     └────┬────┘     └────┬────┘
     │               │               │               │
     │ Click Login   │               │               │
     │──────────────>│               │               │
     │               │ Redirect      │               │
     │               │──────────────>│               │
     │               │               │ OAuth Request │
     │               │               │──────────────>│
     │               │               │               │
     │               │               │<──────────────│
     │               │               │ Auth Code     │
     │               │               │               │
     │               │               │ Exchange Code │
     │               │               │──────────────>│
     │               │               │               │
     │               │               │<──────────────│
     │               │               │ Access Token  │
     │               │               │               │
     │               │               │ Get User Info │
     │               │               │──────────────>│
     │               │               │               │
     │               │               │<──────────────│
     │               │               │ User Data     │
     │               │               │               │
     │               │ JWT + Redirect│               │
     │               │<──────────────│               │
     │ Set Cookie    │               │               │
     │<──────────────│               │               │
     │               │               │               │
```

### Estrutura do JWT

```typescript
// Access Token (15 min)
interface AccessTokenPayload {
  sub: string;      // User ID
  username: string;
  role: 'MEMBER' | 'MODERATOR' | 'ADMIN';
  iat: number;
  exp: number;
}

// Refresh Token (7 days)
interface RefreshTokenPayload {
  sub: string;
  jti: string;      // Token ID (para invalidação)
  iat: number;
  exp: number;
}
```

### Variáveis de Ambiente Necessárias

```bash
# Backend
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
GITHUB_CALLBACK_URL=http://localhost:3001/api/auth/github/callback
JWT_SECRET=xxx
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=xxx
JWT_REFRESH_EXPIRES_IN=7d

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## ✅ Definition of Done

- [ ] Código implementado e revisado
- [ ] Testes unitários passando (>80% coverage)
- [ ] Testes de integração passando
- [ ] Documentação da API atualizada
- [ ] Sem erros de lint/type
- [ ] PR aprovado por 1 reviewer
- [ ] Deploy em ambiente de staging
- [ ] QA validado

---

## 📎 Recursos

- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [NestJS Passport](https://docs.nestjs.com/security/authentication)
- [JWT Best Practices](https://auth0.com/blog/jwt-security-best-practices/)

---

## 📝 Notas

- Considerar adicionar 2FA no futuro
- Avaliar suporte a outros providers (Google, Discord)
- Implementar rate limiting no callback OAuth

---

*Criado em: 2025-12-09*  
*Última atualização: 2025-12-09*
