import { DataSource } from "typeorm";
import dotenv from 'dotenv';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || 'localhost',
  port: process.env.PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "inventory",
  synchronize: true,
  logging: false,
//   entities: ["src/models/**/*.ts"],
  entities: ["src/models/*.ts"],
  migrations: ["src/migration/**/*.ts"],
});
