# Authentication-API

## :memo: Descrição do projeto
Este é um projeto criado utilizando as tecnologias Node e TypeScript, com o objetivo de demonstrar minhas habilidades em abstração, Programação Orientada a Objetos (POO), princípios SOLID, CLEAN CODE e Domain-Driven Design (DDD).

A API desenvolvida neste projeto tem como funcionalidades registrar usuários, autenticar (login) do usuário e recuperar senha do usuário. Para implementar essas funcionalidades, o projeto utiliza o Redis como um mecanismo temporário de armazenamento de tokens para a recuperação de senha do usuário e o PostgreSQL como banco de dados para persistência dos dados do usuário.

Também foi implementada uma funcionalidade de envio de e-mails utilizando a biblioteca Nodemailer.

Para facilitar o gerenciamento e a execução do projeto, foi utilizado o Docker, com a criação de imagens para o Redis e o PostgreSQL. O Docker Compose foi utilizado para rodar a aplicação de forma simples e rápida.

Com este projeto, busquei criar uma estrutura limpa e escalável, seguindo as melhores práticas de desenvolvimento e utilizando tecnologias modernas e confiáveis para garantir a qualidade e a segurança do software.
## :wrench: Tecnologias Utilizadas

Express.js, TypeScript, PostgreSQL, Redis e Docker. 

<img align="left" height="50em" src="https://www.edureka.co/blog/wp-content/uploads/2019/07/express-logo.png" />
<img align="left" height="50em" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
<img align="left" height="50em" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg" />
<img align="left" height="50em" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original-wordmark.svg" />
<img align="left" height="50em" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
<br>
<br>

## :rocket: Implementação futura
* Sem planos futuros para o mesmo.

## Como Rodar o Projeto
Observação: Para rodar o projeto é necessário ter o Docker instalado e configurado na máquina.

Para executar o projeto, siga os passos abaixo:

1. Abra o terminal e navegue até a pasta raiz do projeto.

2. Execute o seguinte comando:
```
docker-compose up
```
Esse comando irá gerar as imagens do Redis e do PostgreSQL e inicializará o servidor na porta 3002.

Observação: É importante lembrar que a primeira execução do comando pode levar alguns minutos, pois o Docker precisa baixar as imagens necessárias para o projeto.

3. Acesse o servidor através do endereço `http://localhost:3002`.

Com esses passos, o projeto deverá estar rodando corretamente na sua máquina.
## :dart: Status do projeto
Projeto finalizado.
