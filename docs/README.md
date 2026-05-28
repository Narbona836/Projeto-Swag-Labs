# SauceDemo Playwright

Projeto de automacao de testes end-to-end usando Playwright para validar fluxos principais do site SauceDemo.

## Objetivo

Este projeto tem como objetivo praticar e estruturar testes automatizados com Playwright, cobrindo cenarios como:

- Login com usuarios validos e invalidos
- Validacao de mensagens de erro no login
- Adicao e remocao de produtos no carrinho
- Inicio do fluxo de checkout
- Validacao de elementos importantes da aplicacao

## Tecnologias

- JavaScript
- Playwright
- Node.js
- GitHub Actions

## Estrutura do Projeto

```text
SauceDemo-Playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
│   ├── README.md
│   └── testCases/
│       └── TEST_CASES.md
├── pages/
│   ├── cartPage/
│   │   └── cartPage.js
│   ├── checkoutPage/
│   │   └── checkoutPage.js
│   ├── dashboardPage/
│   │   └── dashboardPage.js
│   └── loginPage/
│       └── loginPage.js
├── tests/
│   ├── dashboard.spec.js
│   └── loginPage.spec.js
├── playwright.config.js
├── package.json
└── package-lock.json
```

## Page Objects

O projeto utiliza o padrao Page Object para separar as acoes das paginas dos testes.

### LoginPage

Arquivo:

```text
pages/loginPage/loginPage.js
```

Responsavel por centralizar os elementos e acoes da tela de login, como preencher usuario, senha e clicar no botao de login.

### DashboardPage

Arquivo:

```text
pages/dashboardPage/dashboardPage.js
```

Responsavel por centralizar as acoes do dashboard, como adicionar produtos ao carrinho, remover produtos, abrir o carrinho e iniciar o checkout.

### CartPage

Arquivo:

```text
pages/cartPage/cartPage.js
```

Responsavel por centralizar os elementos e acoes da pagina do carrinho, como validar itens adicionados e seguir para o checkout.

### CheckoutPage

Arquivo:

```text
pages/checkoutPage/checkoutPage.js
```

Responsavel por centralizar os elementos e acoes do checkout, como preencher dados do comprador, continuar o fluxo e finalizar a compra.

## Como Instalar

Instale as dependencias do projeto:

```bash
npm install
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

## Como Executar os Testes

Executar todos os testes:

```bash
npx playwright test
```

Executar apenas os testes de login:

```bash
npx playwright test tests/loginPage.spec.js
```

Executar apenas os testes de dashboard:

```bash
npx playwright test tests/dashboard.spec.js
```

Executar com navegador visivel:

```bash
npx playwright test --headed
```

Abrir o relatorio HTML:

```bash
npx playwright show-report
```

## Casos de Teste

A documentacao dos casos de teste fica em:

```text
docs/testCases/TEST_CASES.md
```

Esse arquivo descreve os cenarios cobertos, massa de dados, passos e resultados esperados.

## Configuracao

A configuracao principal fica em:

```text
playwright.config.js
```

Pontos importantes:

- `testDir: './tests'`: define a pasta onde ficam as specs
- `baseURL: 'https://www.saucedemo.com/'`: permite usar `page.goto('/')`
- `trace: 'on-first-retry'`: gera trace quando um teste falha e e reexecutado
- Projeto configurado atualmente para rodar em Chromium

## CI com GitHub Actions

O projeto possui pipeline em:

```text
.github/workflows/playwright.yml
```

Esse workflow executa os testes automaticamente em pushes e pull requests para as branches `main` e `master`.

## Boas Praticas do Projeto

- Manter os testes simples e focados no comportamento esperado
- Usar Page Objects para evitar repeticao de seletores nas specs
- Deixar as validacoes nos testes, usando `expect`
- Evitar seletores muito longos ou muito acoplados ao HTML
- Preferir seletores acessiveis, como `getByRole` e `getByPlaceholder`
- Usar loops com cuidado quando os elementos mudam apos o clique

## Melhorias Futuras

- Adicionar scripts no `package.json`, como `npm test`
- Adicionar mais validacoes no fluxo de compra
- Adicionar testes para ordenacao de produtos
- Expandir execucao para Firefox e WebKit

## Status Atual

O projeto ja possui uma boa base inicial para automacao com Playwright. A proxima evolucao natural e aumentar a cobertura dos fluxos e melhorar a organizacao dos Page Objects conforme novos testes forem surgindo.
