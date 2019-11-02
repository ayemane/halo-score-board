# Halo Score Board

A score card for daily game of Halo

Simple app to track halo scores

# DEVELOPMENT

- from ./api

  - npx sequelize-cli db:migrate
  - npx sequelize-cli db:seed:all

- from ./client

  - npm build --mode production

- from ./

  - npm run dev

- http://localhost:3000

* React app at http://localhost:3000/

## API

- restful: http://localhost:4000/
- graphql: http://localhost:5000/graphql

## React app

- Zip up project (to upload to EB)
  - npm run deploy

* Google assistant invoke with: "Talk to halo score"
