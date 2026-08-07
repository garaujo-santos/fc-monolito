# FC Monolito - E-commerce API

Uma API monolítica de e-commerce construída com **Domain-Driven Design (DDD)**, **TypeScript** e **Express.js**, oferecendo funcionalidades completas para gerenciamento de clientes, produtos, pedidos e faturas.

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Testes](#-testes)
- [Migrações](#-migrações)

---

## 🎯 Visão Geral

FC Monolito é uma aplicação backend completa para gerenciar um e-commerce, implementando:

- ✅ **Gestão de Clientes** - Cadastro e validação de clientes com endereços
- ✅ **Catálogo de Produtos** - Gerenciamento de produtos com preços de compra e venda
- ✅ **Checkout** - Orquestração de pedidos integrando clientes e produtos
- ✅ **Geração de Faturas** - Criação automática de faturas com rastreamento de status
- ✅ **Transações de Pagamento** - Estrutura para processamento de pagamentos
- ✅ **Validações Robustas** - DDD com entidades, value objects e validadores

A aplicação segue os princípios de **Domain-Driven Design**, organizando o código em módulos independentes com responsabilidades bem definidas.

---

## 🏗️ Arquitetura

### Padrão de Organização Modular

```
src/modules/
├── @shared/               # Componentes compartilhados
│   ├── domain/            # Entidades base, value objects
│   ├── factory/           # Fábricas de validadores
│   └── validator/         # Regras de validação comuns
├── client-adm/            # Módulo de Administração de Clientes
│   ├── domain/
│   ├── facade/
│   ├── factory/
│   ├── gateway/
│   ├── repository/
│   └── usecase/
├── product-adm/           # Módulo de Administração de Produtos
├── store-catalog/         # Módulo de Catálogo da Loja
├── checkout/              # Módulo de Checkout
├── invoice/               # Módulo de Faturas
└── payment/               # Módulo de Pagamentos
```

### Padrões de Design

- **Facade Pattern**: Cada módulo expõe uma interface `Facade` simplificada
- **Repository Pattern**: Abstração de persistência de dados
- **Factory Pattern**: Injeção de dependências via factories
- **Gateway Pattern**: Integração com serviços externos
- **DDD**: Agregações, entidades, value objects e validadores

---

## 💻 Tecnologias

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| **Linguagem** | TypeScript | 5.3.3 |
| **Runtime** | Node.js | 24.14.1+ |
| **Framework Web** | Express.js | 4.17.3 |
| **ORM** | Sequelize | 6.17.0 |
| **TypeScript ORM** | sequelize-typescript | 2.1.3 |
| **Banco de Dados** | SQLite | - |
| **Migrations** | Umzug | 3.2.1 |
| **Testes** | Jest | 27.5.1 |
| **Compilação Rápida** | SWC | - |

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ (testado em v24.14.1)
- npm ou yarn

### Setup

```bash
# 1. Clonar/acessar o projeto
cd /home/gasantos/fc-monolito

# 2. Instalar dependências
npm install

# 3. Compilar TypeScript
npm run tsc -- --noEmit

# 4. Executar migrações de banco de dados
npm run migrate -- up

# 5. Iniciar servidor de desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

---

## 🚀 Uso

### Iniciar o Servidor

```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Build
npm run tsc

# Validar tipos sem emitir
npm run tsc -- --noEmit
```

### Executar Testes

```bash
# Executar todos os testes com type-check
npm test

# Executar teste específico
npm test -- --testPathPattern="checkout"

# Executar teste com output detalhado
npm test -- --verbose
```

### Gerenciar Migrações

```bash
# Executar todas as migrations pendentes
npm run migrate -- up

# Reverter última migration
npm run migrate -- down

# Listar migrations executadas
npm run migrate -- executed

# Listar migrations pendentes
npm run migrate -- pending

# Resetar banco completamente
rm database.sqlite
npm run migrate -- up
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000
```

### 1️⃣ Criar Cliente

**POST** `/clients`

```bash
curl -X POST http://localhost:3000/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "document": "123.456.789-00",
    "street": "Rua A",
    "number": "123",
    "complement": "Apto 456",
    "city": "São Paulo",
    "state": "SP",
    "zipcode": "01234-567"
  }'
```

**Resposta (201)**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "João Silva",
  "email": "joao@example.com",
  "document": "123.456.789-00",
  "street": "Rua A",
  "number": "123",
  "city": "São Paulo",
  "state": "SP"
}
```

---

### 2️⃣ Criar Produto

**POST** `/products`

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Notebook Dell",
    "description": "Notebook Dell XPS 13",
    "purchasePrice": 2500.00,
    "salesPrice": 3500.00,
    "stock": 10
  }'
```

**Resposta (201)**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "Notebook Dell",
  "description": "Notebook Dell XPS 13",
  "purchasePrice": 2500,
  "salesPrice": 3500,
  "stock": 10
}
```

---

### 3️⃣ Realizar Checkout (Criar Pedido)

**POST** `/checkout`

```bash
curl -X POST http://localhost:3000/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "550e8400-e29b-41d4-a716-446655440000",
    "products": [
      {
        "productId": "660e8400-e29b-41d4-a716-446655440001",
        "quantity": 1
      }
    ]
  }'
```

**Resposta (201)**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "clientId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "pending",
  "items": [
    {
      "productId": "660e8400-e29b-41d4-a716-446655440001",
      "quantity": 1,
      "salesPrice": 3500
    }
  ],
  "invoiceId": "880e8400-e29b-41d4-a716-446655440003"
}
```

---

### 4️⃣ Obter Fatura

**GET** `/invoice/:id`

```bash
curl -X GET http://localhost:3000/invoice/880e8400-e29b-41d4-a716-446655440003
```

**Resposta (200)**
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440003",
  "name": "João Silva",
  "document": "123.456.789-00",
  "street": "Rua A",
  "number": "123",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234-567",
  "items": [
    {
      "id": "990e8400-e29b-41d4-a716-446655440004",
      "name": "Notebook Dell",
      "price": 3500
    }
  ],
  "status": "pending"
}
```

---

## 📁 Estrutura do Projeto

```
fc-monolito/
├── src/
│   ├── infrastructure/
│   │   ├── api/
│   │   │   ├── express.ts                    # Configuração Express
│   │   │   ├── server.ts                     # Inicialização do servidor
│   │   │   ├── routes/                       # Definição de rotas
│   │   │   ├── mock/                         # Mocks para testes
│   │   │   └── __tests__/                    # Testes E2E
│   │   └── database.sqlite                   # Banco de dados (criado após migrate)
│   │
│   ├── migrations/
│   │   ├── config-migrations/
│   │   │   ├── migrator.ts                   # Configuração Umzug
│   │   │   └── migrator-cli.ts               # CLI para rodar migrations
│   │   └── migrations/
│   │       ├── 001-create-clients.ts         # Tabela de clientes
│   │       ├── 002-create-products.ts        # Tabela de produtos
│   │       ├── 003-create-invoices.ts        # Tabela de faturas
│   │       ├── 004-create-invoice-items.ts   # Itens de fatura
│   │       ├── 005-create-order-clients.ts   # Clientes de pedido
│   │       ├── 006-create-orders.ts          # Tabela de pedidos
│   │       ├── 007-create-order-products.ts  # Produtos de pedido
│   │       └── 008-create-transactions.ts    # Transações de pagamento
│   │
│   └── modules/
│       ├── @shared/                          # Componentes compartilhados
│       ├── client-adm/                       # Gestão de clientes
│       ├── product-adm/                      # Gestão de produtos (admin)
│       ├── store-catalog/                    # Catálogo de loja
│       ├── checkout/                         # Orquestração de pedidos
│       ├── invoice/                          # Geração de faturas
│       └── payment/                          # Processamento de pagamentos
│
├── package.json                              # Dependências e scripts
├── tsconfig.json                             # Configuração TypeScript
├── tslint.json                               # Linting rules
├── jest.config.ts                            # Configuração Jest
└── README.md                                 # Esta documentação
```

---

## ✅ Testes

### Cobertura de Testes E2E

- ✅ **Testes End-to-End** - Fluxos completos da API via HTTP
- ✅ **Validação de Workflows** - Cliente → Produto → Checkout → Fatura
- ✅ **Testes de Erro** - Validações, edge cases, respostas HTTP

### Executar Testes E2E

```bash
# Todos os testes E2E com type-check
npm test

# Teste E2E específico
npm test -- --testPathPattern="checkout.e2e"

# Teste E2E com output detalhado
npm test -- --testPathPattern="client.e2e" --verbose

# Executar um teste específico
npm test -- --testNamePattern="should create a client"
```

### Estrutura de Testes E2E

```
src/infrastructure/api/__tests__/
├── client.e2e.spec.ts          # E2E: POST /clients
│   ├── should create a client
│   └── should validate client data (email, document, etc)
│
├── product.e2e.spec.ts         # E2E: POST /products
│   ├── should create a product
│   └── should validate product prices and stock
│
├── checkout.e2e.spec.ts        # E2E: POST /checkout
│   ├── should create a checkout
│   ├── should validate client exists
│   ├── should validate product stock
│   └── should generate invoice
│
└── invoice.e2e.spec.ts         # E2E: GET /invoice/:id
    ├── should retrieve invoice by ID
    ├── should return 404 if not found
    └── should show invoice items
```

### Fluxo de Teste E2E Completo

Os testes E2E validam o fluxo completo da aplicação:

1. **POST /clients** - Criar cliente com validação de endereço
2. **POST /products** - Criar produto com preços e estoque
3. **POST /checkout** - Realizar pedido (integra cliente + produto)
   - Valida existência do cliente
   - Valida estoque disponível
   - Cria ordem (order)
   - Gera fatura (invoice) automaticamente
4. **GET /invoice/:id** - Recuperar fatura criada no checkout

Cada teste E2E:
- ✅ Inicializa banco de dados limpo
- ✅ Executa requisições HTTP reais via supertest
- ✅ Valida status HTTP (201, 200, 400, 404)
- ✅ Verifica formato das respostas
- ✅ Testa casos de erro (validações, não encontrado)

---

## 🗄️ Banco de Dados

### Tabelas Criadas

| Tabela | Descrição | Campos Principais |
|--------|-----------|------------------|
| `client` | Clientes cadastrados | id, name, email, document, endereço |
| `products` | Produtos do catálogo | id, name, description, purchasePrice, salesPrice, stock |
| `invoices` | Faturas geradas | id, name, document, endereço, status |
| `invoiceItems` | Itens das faturas | id, invoice_id, name, price |
| `orderClient` | Referência de clientes em pedidos | id, name, email, document, endereço |
| `orders` | Pedidos criados | id, client_id, status |
| `orderProducts` | Produtos de cada pedido | id, order_id, name, salesPrice |
| `transactions` | Transações de pagamento | id, order_id, amount, status |

### Migração Automática

As migrations rodam automaticamente ao executar:

```bash
npm run migrate -- up
```

Para resetar o banco:

```bash
rm database.sqlite
npm run migrate -- up
```

---

## 🔒 Validações

A API implementa validações usando **Yup**:

### Clientes
- ✅ Nome obrigatório (string não vazia)
- ✅ Email válido
- ✅ Document obrigatório (CPF/CNPJ)
- ✅ Endereço completo

### Produtos
- ✅ Nome obrigatório
- ✅ Descrição obrigatória
- ✅ Purchase Price > 0
- ✅ Sales Price > 0
- ✅ Stock >= 0

### Checkout
- ✅ Cliente deve existir
- ✅ Produtos devem existir
- ✅ Produto deve ter stock disponível
- ✅ Preço de venda deve ser positivo

---

## Base do Projeto

Este projeto utiliza o repositório base fornecido pelo curso Full Cycle:
https://github.com/devfullcycle/fc-monolito

