[![Node.js CI](https://github.com/emanuelmassafera/imobiliaria-digital-api/actions/workflows/nodejs-ci.yml/badge.svg)](https://github.com/emanuelmassafera/imobiliaria-digital-api/actions/workflows/nodejs-ci.yml)

<h1 align="center">Imobiliária Digital API</h1>

<p align="center">🏠 Project that simulates a digital real estate 🏠</p>

<h4 align="center">🚧   Done 🚀 🚧</h4>

---

Table of contents
=================
<!--ts-->
   * [About the project](#-about-the-project)
   * [Technologies](#-technologies)
   * [Functionalities](#-functionalities)
   * [How to run](#-how-to-run)
   * [Author](#-author)
   * [License](#-license)
<!--te-->

---

## About the project <a name="-about-the-project" style="text-decoration:none"></a>

API made with NodeJS and MongoDB stack that simulates an example of a digital real estate, where owners can share the offers of their properties. The project uses Typescript, TDD, Clean Architecture, Design Patterns and SOLID principles. 

Swagger documentation can be accessed via the [link](https://imobiliaria-digital-api.herokuapp.com/api-docs/).

---

## Technologies <a name="-technologies" style="text-decoration:none"></a>

- **[NodeJS](https://nodejs.org/en/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Express](http://expressjs.com/)**
- **[MongoDB](https://www.mongodb.com/)**
- **[MongoDB NodeJS Driver](https://github.com/mongodb/node-mongodb-native)**
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)**
- **[Validator](https://github.com/validatorjs/validator.js)**
- **[Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)**
- **[CEP Promise](https://github.com/BrasilAPI/cep-promise)**
- **[CPF CNPJ Validator](https://github.com/carvalhoviniciusluiz/cpf-cnpj-validator#readme)**
- **[Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)**
- **[Jest](https://jestjs.io/)**
- **[ESLint](https://eslint.org/)**
- **[Husky](https://typicode.github.io/husky/#/)**
- **[Lint Staged](https://github.com/okonet/lint-staged#readme)**
- **[Git Commit Msg Linter](https://github.com/legend80s/commit-msg-linter#readme)**
- **[SuperTest](https://github.com/visionmedia/supertest#readme)**

---

## Functionalities <a name="-functionalities" style="text-decoration:none"></a>

### Owners

- **[Register Owner](./requirements/owner/register-owner.md)**
- **[Owner Login](./requirements/owner/owner-login.md)**

### Properties

- **[Add Property](./requirements/property/add-property.md)**
- **[Load Owner Properties](./requirements/property/load-owner-properties.md)**
- **[Load Owner Property By Id](./requirements/property/load-owner-property-by-id.md)**
- **[Update Owner Property](./requirements/property/update-owner-property.md)**
- **[Remove Owner Property](./requirements/property/remove-owner-property.md)**
- **[Load Properties](./requirements/property/load-properties.md)**
- **[Load Property By Id](./requirements/property/load-property-by-id.md)**

---

## How to run <a name="-how-to-run" style="text-decoration:none"></a>

### Prerequisites

Before starting, you will need to have the following tools installed on your machine: [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/). To work with the code, it is recommended to use a good editor, such as the [VSCode](https://code.visualstudio.com/).

About the database: there are some options on how to configure, such as installing MongoDB on your machine or using MongoDB Atlas, just remembering to change the database connection url in the [env file.](./src/main/config/env.ts)

#### Running the application

```bash

# Clone this repository
$ git clone https://github.com/emanuelmassafera/imobiliaria-digital-api.git

# Access the project folder via the terminal/cmd
$ cd imobiliaria-digital-api

# Install dependencies
$ npm install

# Run
$ npm start

# The server will start at port:5050

```
---

## Author <a name="-author" style="text-decoration:none"></a>

<img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/65625500?s=460&u=eb9e300de61698fc8531949a451ce2f0e9da46f9&v=4" width="100px;" alt=""/>
<sub>Emanuel Massafera</sub>

<b></b>

[![Badge](https://img.shields.io/static/v1?label=&message=Emanuel&color=blue&style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/emanuelmassafera/)](https://www.linkedin.com/in/emanuelmassafera/) [![Badge](https://img.shields.io/static/v1?label=&message=emanuel301@live.com&color=0078D4&style=flat-square&logo=Microsoft-Outlook&logoColor=white&link=mailto:emanuel301@live.com)](mailto:emanuel301@live.com)

---

## License <a name="-license" style="text-decoration:none"></a>

This repository is licensed by **MIT LICENSE**. For detailed information, read the file [LICENSE](https://github.com/emanuelmassafera/imobiliaria-digital-api/blob/master/LICENSE). 

Made with ♥ by Emanuel Massafera :wave: [Get in touch!](https://www.linkedin.com/in/emanuelmassafera/)
