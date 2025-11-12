# 🧾 NF Korp – Sistema de Emissão de Notas Fiscais

## 📦 Visão Geral
O **NF Korp** é um sistema fullstack desenvolvido para o **teste técnico da Korp ERP VIASOFT**, composto por:

- **Frontend:** Angular 19  
- **Backend:** Microsserviços em **.NET 9 (C#)**  
  - `InventoryService` — Controle de produtos e estoque  
  - `BillingService` — Emissão e impressão de notas fiscais  

Os microsserviços se comunicam via **APIs REST**, com o `BillingService` consumindo o `InventoryService` para reservar produtos ao imprimir notas fiscais.

---

## 🧩 Requisitos

| Tecnologia | Versão Recomendada |
|-------------|--------------------|
| .NET SDK | **9.0.306** |
| Node.js | **23.x** |
| Angular CLI | **19.x** |
| Docker & Docker Compose | **24+** |
| NPM | **10+** |

---

## 🚀 Como Executar o Projeto

Você pode rodar o sistema de **duas formas**:
1. Via **scripts batch (modo local)**  
2. Via **Docker Compose (modo containerizado)**
3. **Manualmente, abrindo um terminal em cada diretório**

---

## 1. Usando batch scripts


| Scripts | O que faz
|-------------|---------|
| start-frontend.bat | 🚀 Inicializa o projeto angular
| stop-frontend.bat | ❌ Encerra o projeto angular
| startApiServices.bat | 🚀 Inicializa as API (Billing e Inventory)
| stopApiServices.bat | ❌ Encerrra as API (Billing e Inventory)

### 1.1 Caso seja necessário inicializar/encerrar as API individualmente:

| Scripts | O que faz
|-------------|---------|
| startAPI-BillingService.bat | 🚀 Inicializa a API BillingService
| stopApi-BillingService.bat | ❌ Encerra a API BillingService
| startApi-InventoryService.bat | 🚀 Inicializa a API InventoryService
| stopApi-InventoryService.bat | ❌ Encerrra a API InventoryService

### 1.2 💻 Após a inicialização os serviços rodarão nas seguintes portas:
| Aplicações | URL
|------------------|----------------------|
| Frontend Angular | http://localhost:4200
| API BillingService | http://localhost:5200
| API InventoryService | http://localhost:5100

 
## 2. 🐬 Usando Docker Compose 

**Construa e suba os containers com :**

docker compose up --build

**Parar os containers com :**

docker compose down

## 3. 🤖 Subindo o projeto manualmente
### Frontend Angular
- No diretório **./frontend/korp-angular**
- **Digite os seguintes comandos no terminal:**

      npm install

      ng serve

### API .NET (BillingService)
- No diretório ./backend/BillingService
- **Digite os seguintes comandos no terminal:**

      dotnet build && dotnet run

### API .NET (InventoryService)
- No diretório ./backend/InventoryService
- **Digite os seguintes comandos no terminal:**

      dotnet build && dotnet run


## 🔑 Credenciais de Login

**Login de Teste:**

    Usuário: KorpNF

    Senha: 1234


## ⚡ Principais Funcionalidades

📦 InventoryService

- CRUD de produtos (API REST)

- Persistência local com SQLite (inventory.db)

- Endpoint /api/products/{id}/reserve para reserva de estoque

🧾 BillingService

- Emissão de notas fiscais com numeração sequencial

- Impressão de notas e reserva de produtos via InventoryService

- Tratamento de falhas com Polly (tentativas automáticas com delay)

- Reprocessamento de notas com status “Falha”

💻 Frontend (Angular)

- Tela de login

- Navegação entre Produtos e Notas Fiscais

- CRUD de produtos

- Emissão e reimpressão de notas fiscais

- Feedback visual (mensagens de sucesso e erro)

- Ícones e layout modernos com Bootstrap 5

- Loader animado durante impressão e reprocessamento
---

## 💢 Teste de Tratamento de Falhas

 - Simule desligando o InventoryService e tentando imprimir uma nota:

   - O BillingService tentará 3 vezes antes de registrar a falha.

   - A nota será marcada com status “Falha”.

   - Quando o serviço voltar, é possível reprocessar a nota clicando em “Reprocessar” no frontend.

## 🧩 Considerações Técnicas 
- Os microsserviços usam SQLite local como banco.

- Comunicação entre serviços ocorre via HTTP interno.

- O BillingService aplica Polly Retry (3 tentativas de 1s) para tolerar falhas.

- O frontend é uma SPA com rotas protegidas por AuthGuard.

---
### 💼 Teste Técnico desenvolvido por
| 👨‍💻 Autor | Caio Monteiro
|-------|----------|
