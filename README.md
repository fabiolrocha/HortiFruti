# Projeto HortiFruti

API desenvolvida em NestJS para o sistema do nosso HortiFruti.

## Integrantes do Grupo

- Fábio Luiz Cardoso Laranjeira Rocha - UC23101369
- Caio Fellipe de Oliveira Martins - UC22201216
- Arthur de Oliveira Freire - UC23101383

## Instruções para Execução

### Pré-requisitos

- Node.js (versão >= 16.0)
- npm (ou yarn)
- Um servidor de banco de dados MySQL em execução.

### 1. Instalação das Dependências

- Navegue até a pasta `Back-end` e execute o comando abaixo para instalar todas as dependências do projeto:

- npm install

- Necessário possuir um DataBase em algum Banco de dados (O utilizado por nós foi o MySql)

### 2. Alteração no arquivo scr/app.module.ts

- Alterar as informações para vinculação com o banco de dados:

- Alterar o Host e Senha

### 3. Criar o DataBase do banco de dados

- Abrir o banco de dados e criar o DataBase com o nome informado no app.module

### 4. Executar o BackEnd

- Na pasta Backend, ir no terminal dela e digitar o comando:

- npm run start:dev

### 5. Executar o FrontEnd

- Na pasta Frontend, ir no terminal dela e digitar o comando:

- npm start

### 6. Após cadastrar o primeiro usuário, copiar o ID

- É necessario copiar o id do usuário e colar junto dessa url para fazer a requisição dos testes de pedidos

- Abra o PostMan ou Insomnia e cole a seguinte url: POST http://[::1]:3000/pedidos/seed/{SEU ID AQUI}

### 7. Link do Vídeo

- https://www.youtube.com/watch?v=jAtH3FN6wqk
