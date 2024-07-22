<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash

$ npm install @nestjs/common @nestjs/core @nestjs/platform-express
$ npm install class-validator class-transformer
$ npm install --save-dev prisma
$ npm install @prisma/client
$ npm install --save moment-timezone

$ npm install


```

## .env and db schema
```bash
# Configure your database connection in the .env file:

DATABASE_URL="postgresql://username:password@localhost:5432/lottery_db?schema=public"


# set up your prsima
$ npx prisma init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Sale {
  id           Int      @id @default(autoincrement())
  powerBall    Int
  mobileNo     String
  clientrefno  String   @unique
  billNumber   String
  barcode      String
  billDate     DateTime
  billAmount   Float
  roundNo      String
  saleDetails  SaleDetail[]
}

model SaleDetail {
  id           Int      @id @default(autoincrement())
  saleId       Int
  billNumber   String
  itemId       Int
  saleDigit    String
  saleAmount   Float
  sale         Sale     @relation(fields: [saleId], references: [id])
}



# build and push db
$ npx prisma generate
$ npx prisma db push

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Test Case this Rest API Project 
```bash
curl -X POST http://localhost:3000/lottery/sale \
-H "Content-Type: application/json" \
-d '{
    "powerBall": 0,
    "mobileNo": "+8562055614884",
    "clientrefno": "2405769HFOM79CSFSDF556FDSAFSD5dfd357749",
    "saleDetails": [
        {
            "billNumber": "ດຫກັດກຫັດຫກ",
            "itemId": 0,
            "saleDigit": "001314",
            "saleAmount": 1000
        },
        {
            "billNumber": "ດຫກັດກຫັດຫກ",
            "itemId": 0,
            "saleDigit": "56",
            "saleAmount": 1000
        }
    ]
}'
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
