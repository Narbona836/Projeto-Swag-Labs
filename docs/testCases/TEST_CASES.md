# Casos de Teste

Este documento descreve os casos de teste referentes ao projeto SauceDemo Playwright.

## Escopo

Os casos de teste cobrem os fluxos automatizados existentes nas specs:

- Login
- Validacao de mensagens de erro
- Dashboard de produtos
- Carrinho de compras
- Inicio do checkout

## Massa de Dados

| Usuario | Senha | Contexto |
| --- | --- | --- |
| `standard_user` | `secret_sauce` | Login valido |
| `standard_user` | `secret_sauce1` | Senha invalida |
| `locked_out_user` | `secret_sauce` | Usuario bloqueado |
| `problem_user` | `secret_sauce` | Usuario problematico |
| `performance_glitch_user` | `secret_sauce` | Usuario com performance lenta |
| vazio | vazio | Campos obrigatorios |

## Casos de Login

### CT-001 - Login com usuario valido

**Objetivo:** validar que um usuario valido consegue acessar a aplicacao.

**Pre-condicoes:**

- Acessar a pagina inicial do SauceDemo.

**Passos:**

1. Preencher o campo `Username` com `standard_user`.
2. Preencher o campo `Password` com `secret_sauce`.
3. Clicar no botao `Login`.

**Resultado esperado:**

- O usuario deve acessar a area logada da aplicacao.
- A tela de produtos deve ser exibida.

**Status:** automatizado em `tests/loginPage.spec.js`.

### CT-002 - Login com senha invalida

**Objetivo:** validar que o sistema exibe erro ao informar senha incorreta.

**Pre-condicoes:**

- Acessar a pagina inicial do SauceDemo.

**Passos:**

1. Preencher o campo `Username` com `standard_user`.
2. Preencher o campo `Password` com `secret_sauce1`.
3. Clicar no botao `Login`.

**Resultado esperado:**

- O sistema deve exibir a mensagem `Epic sadface: Username and password do not match any user in this service`.
- O usuario deve permanecer na tela de login.

**Status:** automatizado em `tests/loginPage.spec.js`.

### CT-003 - Login com usuario bloqueado

**Objetivo:** validar que usuario bloqueado nao consegue acessar a aplicacao.

**Pre-condicoes:**

- Acessar a pagina inicial do SauceDemo.

**Passos:**

1. Preencher o campo `Username` com `locked_out_user`.
2. Preencher o campo `Password` com `secret_sauce`.
3. Clicar no botao `Login`.

**Resultado esperado:**

- O sistema deve exibir a mensagem `Epic sadface: Sorry, this user has been locked out.`.
- O usuario deve permanecer na tela de login.

**Status:** automatizado em `tests/loginPage.spec.js`.

### CT-004 - Login com usuario problematico

**Objetivo:** validar que o usuario `problem_user` consegue autenticar na aplicacao.

**Pre-condicoes:**

- Acessar a pagina inicial do SauceDemo.

**Passos:**

1. Preencher o campo `Username` com `problem_user`.
2. Preencher o campo `Password` com `secret_sauce`.
3. Clicar no botao `Login`.

**Resultado esperado:**

- O usuario deve acessar a aplicacao.
- A pagina deve manter o titulo `Swag Labs`.

**Status:** automatizado em `tests/loginPage.spec.js`.

### CT-005 - Login com usuario de performance

**Objetivo:** validar que o usuario `performance_glitch_user` consegue autenticar na aplicacao.

**Pre-condicoes:**

- Acessar a pagina inicial do SauceDemo.

**Passos:**

1. Preencher o campo `Username` com `performance_glitch_user`.
2. Preencher o campo `Password` com `secret_sauce`.
3. Clicar no botao `Login`.

**Resultado esperado:**

- O usuario deve acessar a aplicacao.
- A pagina deve manter o titulo `Swag Labs`.

**Status:** automatizado em `tests/loginPage.spec.js`.

### CT-006 - Login com campos vazios

**Objetivo:** validar obrigatoriedade dos campos de login.

**Pre-condicoes:**

- Acessar a pagina inicial do SauceDemo.

**Passos:**

1. Deixar o campo `Username` vazio.
2. Deixar o campo `Password` vazio.
3. Clicar no botao `Login`.

**Resultado esperado:**

- O sistema deve exibir a mensagem `Epic sadface: Username is required`.
- O usuario deve permanecer na tela de login.

**Status:** automatizado em `tests/loginPage.spec.js`.

## Casos de Dashboard e Carrinho

### CT-007 - Adicionar todos os produtos ao carrinho e remove-los

**Objetivo:** validar que o usuario consegue adicionar todos os produtos ao carrinho e remove-los em seguida.

**Pre-condicoes:**

- Usuario autenticado com `standard_user`.
- Dashboard de produtos carregado.

**Passos:**

1. Clicar em todos os botoes `Add to cart` disponiveis.
2. Validar que o contador do carrinho exibe `6`.
3. Clicar em todos os botoes `Remove` disponiveis.

**Resultado esperado:**

- Todos os produtos devem ser adicionados ao carrinho.
- Apos a remocao, o contador do carrinho deve ficar oculto.

**Status:** automatizado em `tests/dashboard.spec.js`.

### CT-008 - Adicionar todos os produtos ao carrinho e finalizar compra

**Objetivo:** validar que o usuario consegue adicionar produtos ao carrinho, preencher os dados do checkout, revisar o resumo e finalizar a compra.

**Pre-condicoes:**

- Usuario autenticado com `standard_user`.
- Dashboard de produtos carregado.

**Passos:**

1. Clicar em todos os botoes `Add to cart` disponiveis.
2. Validar que o contador do carrinho exibe `6`.
3. Abrir o carrinho de compras.
4. Validar que existem `6` itens no carrinho.
5. Clicar no botao `Checkout`.
6. Validar que a tela `Checkout: Your Information` foi exibida.
7. Preencher `First Name`, `Last Name` e `Zip/Postal Code`.
8. Clicar no botao `Continue`.
9. Validar que a tela `Checkout: Overview` foi exibida.
10. Validar que existem `6` itens no resumo da compra.
11. Validar informacoes de pagamento, entrega, subtotal, taxa e total.
12. Clicar no botao `Finish`.

**Resultado esperado:**

- A compra deve ser finalizada com sucesso.
- O sistema deve exibir a mensagem `Thank you for your order!`.
- O botao `Back Home` deve estar visivel.

**Status:** automatizado em `tests/dashboard.spec.js`.

## Casos Sugeridos para Evolucao

### CT-009 - Ordenar produtos por menor preco

**Objetivo:** validar que a ordenacao por menor preco exibe produtos do menor para o maior valor.

**Resultado esperado:**

- O primeiro produto listado deve ter preco menor ou igual ao ultimo produto listado.

**Status:** sugerido.

### CT-010 - Checkout com campos obrigatorios vazios

**Objetivo:** validar as mensagens de obrigatoriedade na tela de checkout.

**Resultado esperado:**

- O sistema deve exibir mensagem de erro para os campos obrigatorios ausentes.

**Status:** sugerido.
