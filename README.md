# node-typescript-mongodb-swagger-boilerplate

![](https://img.shields.io/badge/Typescript-4.4-blue)![](https://img.shields.io/badge/Nodejs-%3E=17.0.0-blue)![](https://img.shields.io/badge/license-APLv2-blue)

- [Typescript 4.4](https://www.typescriptlang.org/)
- [Expressjs](https://expressjs.com/) back end web application framework
- jsonwebtoken for autheitication
- [MongoDB](https://www.mongodb.com/) 
- [Swagger](https://www.npmjs.com/package/express-jsdoc-swagger) express-jsdoc-swagger without writing YAML or JSON
- ESLint
- Unit Test
- [Best Security Practices](https://expressjs.com/en/advanced/best-practice-security.html) such as [Helmet](https://www.npmjs.com/package/helmet)
- [Yarn](https://yarnpkg.com/)
- [Prettier](https://prettier.io/) to enforce consistent code style

## Getting Started

Please use the latest Node.js avaliable on [Nodejs.org](https://nodejs.org/en/)

#### Clone the project

To clone the boilerplate, please use the following commands:

```
git clone https://github.com/stevekwokdev/node-typescript-mongodb-swagger-boilerplate.git
cd node-typescript-mongodb-swagger-boilerplate
yarn install
```

#### Prepare the environment variables

Create an `.env` file in project. 

Default variables
```
PORT=3000
NODE_ENV=<development|production|test>
API_VER=v1
JWT_SECRET=
# DEV DB Connection String
DATABASE_DEV=
# TEST DB Connection String
DATABASE_TEST=
# PROD DB Connection String
DATABASE_PROD=
```

## Available Scripts

- `yarn watch:windows` watch mode to automatically re-run if detected changed for Windows machine
- `yarn watch:mac` watch mode to automatically re-run if detected changed for Mac OS machine
- `yarn test:windows` run the test under Windows machine
- `yarn test:mac` run the test under Mac OS machine
- `yarn build` build the project

## API Routes
The route prefix is `/api/${API_VER}/` by default, you can change the version in the `.env` file. 

| Route      | Description |
| --------- | -----:|
| /api-docs| The Swagger docunment|
| /api/${API_VER}/user/register  | Example Route - This is the service to register account |
| /api/${API_VER}/user/login    |   Example Route - This is the service to login account |
| /api/${API_VER}/user/get    |   Example Route - This is the service to get your user info |

## Project Structure
| Name      | Description |
| --------- | -----:|
| .vscode/  | VSCode tasks, launch configuration and some other settings |
| build/     |   Compiled source files will be placed here |
| logs/     |  Application logger files |
| .env      |    Environment configurations |
| src/      |    source codes |
| src/controllers/      |    API Controllers |
| src/logger/      |    The core feature of logger |
| src/handlers/     |    The handlers like global error exception handler |
| src/models/      |    Mongoose ORM Models |
| src/services/      |    Service layer|
| src/routes/      |    The API routers |
| src/types/*.d.ts     |    Custom type definitions and files that aren't on DefinitelyTyped |
| src/test/*.test.ts     |    Unit Test |


## License

Licensed under the APLv2. See the [LICENSE](https://github.com/stevekwokdev/node-typescript-mongodb-swagger-boilerplate/blob/origin/master/LICENSE) file for details.
