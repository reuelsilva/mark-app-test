# Mark App - Testes E2E

Projeto de testes end-to-end para a aplicação **Mark** — um gerenciador de tarefas composto por uma API REST e uma interface web.

## Estrutura do Projeto

```
mark-app-test/
├── apps/
│   ├── api/          # API REST (Node.js + Express + TypeORM + SQLite)
│   └── web/          # Frontend estático (servido via http-server)
├── pages/
│   └── taskPage/     # Page Object Model para a página de tarefas
├── tests/
│   ├── fixtures/     # Dados de teste (taskModel, tasks.json)
│   ├── helpers/      # Funções auxiliares de API
│   ├── home.spec.ts  # Teste de disponibilidade da webapp
│   └── tasks.spec.ts # Testes funcionais de tarefas
└── playwright.config.ts
```

## Instalação

### 1. Instalar dependências dos testes

```bash
npm install
npx playwright install
```

### 2. Instalar e iniciar a API

```bash
cd apps/api
npm install
npm run db:init
npm start
```

> A API será iniciada em `http://localhost:3333`

### 3. Instalar e iniciar o Frontend

```bash
cd apps/web
npm install
npm start
```

> O frontend será iniciado em `http://localhost:8080`

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
BASE_API=http://localhost:3333
```

## Executando os Testes

```bash
# Executar todos os testes
npm test

# Executar em modo debug
npm run debug

# Visualizar relatório HTML
npm run report
```

## Casos de Teste

| Teste | Descrição |
|---|---|
| `home.spec.ts` | Verifica se a webapp está online |
| `tasks.spec.ts` | Cadastrar nova tarefa |
| `tasks.spec.ts` | Não permitir tarefa duplicada |
| `tasks.spec.ts` | Exibir campo obrigatório |
| `tasks.spec.ts` | Marcar tarefa como concluída |
| `tasks.spec.ts` | Remover uma tarefa |

## API Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/tasks` | Listar todas as tarefas |
| `POST` | `/tasks` | Criar nova tarefa |
| `PUT` | `/tasks/:id` | Atualizar status da tarefa |
| `DELETE` | `/tasks/:id` | Remover tarefa por ID |

### Endpoints Helper (apenas em ambiente não-produção)

| Método | Rota | Descrição |
|---|---|---|
| `DELETE` | `/helper/tasks` | Remover tarefa por nome (body: `{ name }`) |
| `DELETE` | `/helper/tasks/:task_name` | Remover tarefa por nome (param) |

> Esses endpoints são utilizados nos testes E2E para limpeza de dados antes de cada cenário.

> Uma coleção do Postman está disponível em `Postman_Mark_Api.json`.

## Tecnologias

- [Playwright](https://playwright.dev/) — framework de testes E2E
- [TypeScript](https://www.typescriptlang.org/) — linguagem dos testes
- [Express](https://expressjs.com/) — framework da API
- [TypeORM](https://typeorm.io/) + SQLite — banco de dados da API

## Autor

Reuel Silva
