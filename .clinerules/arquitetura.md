# Arquitetura Frontend Next.js

## Estrutura de Diretórios

```
src/
├── app/                    # Rotas e páginas
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes de UI básicos
│   └── common/           # Componentes compartilhados
├── hooks/                # Custom hooks
├── services/             # Serviços e APIs
├── styles/               # Estilos globais
├── types/                # Definições de tipos
├── utils/                # Funções utilitárias
└── lib/                  # Bibliotecas e configurações

```

## Boas Práticas

1. **Componentização**
  - Componentes pequenos e reutilizáveis
  - Separação clara de responsabilidades

2. **Gerenciamento de Estado**
  - Context API para estado global
  - Hooks personalizados para lógica reutilizável

3. **Performance**
  - Lazy loading
  - Otimização de imagens
  - Server-side rendering

4. **Padrões de Código**
  - TypeScript para type safety
  - ESLint e Prettier para formatação
  - Conventional Commits

5. **Testes**
  - Jest para testes unitários
  - Testing Library para testes de componentes