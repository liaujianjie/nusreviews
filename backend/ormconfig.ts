import { ConnectionOptions } from "typeorm";

export const postgres: ConnectionOptions = {
  type: "postgres",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  ssl: true,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/src/entities/**/*.js`],
  migrations: [`${__dirname}/src/migrations/**/*.js`],
  subscribers: [`${__dirname}/src/subscribers/**/*.js`],
  cli: {
    entitiesDir: `${__dirname}/src/entities`,
    migrationsDir: `${__dirname}/src/migrations`,
    subscribersDir: `${__dirname}/src/subscribers`
  },
  migrationsRun: true
};

export default postgres;
