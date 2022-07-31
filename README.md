# node_template

## Copy .env

```bash
npm run copy_env
```

## Remove node_modules and package-lock.json

```bash
npm run clear
```

## Develop

```bash
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Sequelize

- config path

`
/src/config/sql.js
`

- sequelize setting file path

`
.sequelizerc
`

- create new migrate template

```bash
npx sequelize-cli migration:generate --name update-user-column
```

- update SQL

```bash
npx sequelize-cli db:migrate
```
- undo migrate

```bash
npx sequelize-cli db:migrate:undo
```

## Docker

```bash
docker build -t ci-module:v1.0.0 . --no-cache
```

```bash
docker run -p 5000:3000 ci-module:v1.0.0
```

## Loaders

- [x] express
- [x] logger
- [x] sequelize
- [x] swagger