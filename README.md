# Invoice Module: Implementação de Sistema de Notas Fiscais com DDD

## Sobre o Projeto

Implementação de um módulo completo de gerenciamento de notas fiscais (invoices) utilizando **Domain Driven Design (DDD)**.

Este módulo faz parte de um monolito modular que implementa boas práticas de arquitetura de software em TypeScript.

## Tecnologias

- **Linguagem**: TypeScript 4.x
- **Testes**: Jest 29.x (testes unitários)
- **ORM**: Sequelize 6.x + sequelize-typescript
- **Banco de Dados**: SQLite (persistência em memória para testes)
- **Padrões**: Domain-Driven Design (DDD)

## Pré-requisitos

- Node.js >= 16
- npm >= 7

## Instalação

```bash
npm install
```

## Rodando os Testes

### Rodar todos os testes do módulo Invoice

```bash
npm test -- src/modules/invoice
```

### Rodar testes específicos

**Testes do Repository:**
```bash
npm test -- src/modules/invoice/repository/invoice.repository.spec.ts
```

**Testes do GenerateInvoiceUseCase:**
```bash
npm test -- src/modules/invoice/usecase/generate-invoice/generate-invoice.usecase.spec.ts
```

**Testes do FindInvoiceUseCase:**
```bash
npm test -- src/modules/invoice/usecase/find-invoice/find-invoice.usecase.spec.ts
```

**Testes da Facade:**
```bash
npm test -- src/modules/invoice/facade/invoice.facade.spec.ts
```

### Modo watch
```bash
npm test -- src/modules/invoice --watch
```

### Com coverage
```bash
npm test -- src/modules/invoice --coverage
```

### Validação TypeScript
```bash
npm run tsc -- --noEmit
```

## Componentes Implementados

**Domain Layer**
- Invoice (Aggregate Root)
- InvoiceItem (Entity)
- Address (Value Object)

**Application Layer**
- GenerateInvoiceUseCase
- FindInvoiceUseCase

**Infrastructure Layer**
- InvoiceRepository
- InvoiceModel

**Presentation Layer**
- InvoiceFacade
- InvoiceFacadeFactory

### Invoice Repository Tests (invoice.repository.spec.ts)

| Teste | Descrição |
|-------|-----------|
| `should create and return an invoice` | Valida persistência de fatura |
| `should find an invoice by id` | Valida recuperação de fatura |

### GenerateInvoiceUseCase Tests (generate-invoice.usecase.spec.ts)

| Teste | Descrição |
|-------|-----------|
| `should generate an invoice` | Valida criação de fatura com dados corretos |

### FindInvoiceUseCase Tests (find-invoice.usecase.spec.ts)

| Teste | Descrição |
|-------|-----------|
| `should find an invoice` | Valida busca de fatura por ID |

### Facade Tests (invoice.facade.spec.ts)

| Teste | Descrição |
|-------|-----------|
| `should generate an invoice via facade` | Valida geração através da facade |
| `should find an invoice via facade` | Valida busca através da facade |

### Resultado dos Testes

✅ **6 testes passando** (4 test suites)

```
PASS src/modules/invoice/usecase/generate-invoice/generate-invoice.usecase.spec.ts
PASS src/modules/invoice/usecase/find-invoice/find-invoice.usecase.spec.ts
PASS src/modules/invoice/facade/invoice.facade.spec.ts
PASS src/modules/invoice/repository/invoice.repository.spec.ts

Test Suites: 4 passed, 4 total
Tests:       6 passed, 6 total
Time:        ~2-3s
```

## Padrões Utilizados

- **Domain-Driven Design (DDD)**: Estrutura completa com camadas (domain, application, infrastructure, presentation)
- **Aggregate Root Pattern**: Invoice como agregado raiz
- **Value Object Pattern**: Address como objeto imutável
- **Entity Pattern**: InvoiceItem como entidade com identidade
- **Repository Pattern**: Abstração de persistência via InvoiceGateway
- **Facade Pattern**: Interface unificada para cliente
- **Factory Pattern**: Criação centralizada de dependências
- **Use Case Pattern**: Lógica de negócio isolada e testável
- **Data Transfer Object (DTO)**: Contrato de entrada/saída


## Base do Projeto

Este projeto utiliza o repositório base fornecido pelo curso Full Cycle:
https://github.com/devfullcycle/fc-monolito

