# NotiFlow Frontend

Interface de usuário para o sistema de gerenciamento de notificações NotiFlow.

## Tecnologias Utilizadas

- React
- Vite
- Tailwind CSS
- React Router
- Heroicons

## Requisitos

- Node.js 16.x ou superior
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em `http://localhost:3000`

## Build

Para criar uma versão de produção:

```bash
npm run build
# ou
yarn build
```

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── pages/         # Páginas da aplicação
  ├── App.jsx        # Componente principal
  └── main.jsx       # Ponto de entrada
```

## Funcionalidades

- Dashboard com visão geral das notificações
- Gerenciamento de notificações
- Configurações de integração com diferentes plataformas (Slack, WhatsApp, Gmail) 