# Voke — E-commerce Fullstack

Voke é uma plataforma de **e-commerce** desenvolvida com arquitetura **Fullstack moderna**, permitindo navegação de produtos, gerenciamento de carrinho, autenticação de usuários e fluxo completo de checkout.

O projeto foi construído utilizando tecnologias modernas como React, Vite, Express e Prisma, garantindo alta performance, organização de código e escalabilidade.

---

# Preview

Interface moderna com foco em experiência de compra para **desktop e mobile**, incluindo:

- Catálogo de produtos
- Carrinho de compras
- Sistema de favoritos
- Checkout em etapas
- Autenticação de usuários

---

# Arquitetura do Projeto

O sistema é dividido em duas aplicações principais:

```
voke
 ├ backend
 └ frontend
```

---

# Tecnologias Utilizadas

## Frontend

- React
- TypeScript
- Vite
- Ant Design
- React Router
- React Query
- Zustand
- Axios

Responsabilidades:

- Interface do usuário
- Navegação entre páginas
- Comunicação com API
- Gerenciamento de estado
- Experiência responsiva

---

## Backend

- Node.js
- Express
- Prisma ORM
- Supabase
- JWT (JSON Web Token)
- bcrypt

Responsabilidades:

- API REST
- Lógica de negócio
- Autenticação
- Gerenciamento de usuários
- Integração com banco de dados

---

# Funcionalidades

## Autenticação de Usuário

Usuários podem:

- Criar conta
- Fazer login
- Manter sessão autenticada

Segurança:

- Senhas criptografadas com bcrypt
- Autenticação baseada em JWT

---

# Catálogo de Produtos

- Listagem de produtos
- Visualização de detalhes
- Exibição de imagens
- Exibição de preço e descrição
- Filtragem por categoria

---

# Carrinho de Compras

Funcionalidades:

- Adicionar produtos
- Remover produtos
- Alterar quantidade
- Visualizar subtotal

O estado do carrinho é gerenciado com **Zustand**.

---

# Favoritos

Usuários podem:

- Adicionar produtos aos favoritos
- Visualizar lista de favoritos
- Remover produtos favoritos

---

# Checkout

O processo de checkout é dividido em etapas:

1. Contato
2. Endereço de entrega
3. Frete
4. Pagamento
5. Confirmação do pedido

---

# Estrutura do Projeto

## Frontend

```
frontend
 ├ src
 │ ├ assets
 │ ├ components
 │ ├ layout
 │ ├ pages
 │ ├ router
 │ ├ services
 │ ├ store
 │ ├ types
 │ ├ App.tsx
 │ └ main.tsx
```

---

## Backend

```
backend
 ├ src
 │ ├ controllers
 │ ├ lib
 │ ├ middleware
 │ ├ routes
 │ ├ services
 │ ├ types
 │ └ server.ts
```

---

# Segurança

O sistema utiliza:

- Hash de senha com **bcrypt**
- Autenticação com **JWT**
- Rotas protegidas
- Separação entre frontend e backend

---

# Escalabilidade

A arquitetura permite expansão futura com:

- Painel administrativo
- Integração com gateways de pagamento
- Controle de estoque
- Sistema de cupons
- Analytics de vendas

---

# Autor

Desenvolvido por **Victor**.