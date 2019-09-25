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
  entities: ["./src/entities/**/*.{js, ts}"],
  migrations: ["./src/migrations/**/*.{js, ts}"],
  subscribers: ["./src/subscribers/**/*.{js, ts}"],
  cli: {
    entitiesDir: "./src/entities",
    migrationsDir: "./src/migrations",
    subscribersDir: "./src/subscribers"
  },
  migrationsRun: true
};

export default postgres;
