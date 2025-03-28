import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "inventory_user",
  password: "63745nil",
  database: "inventory",
  synchronize: true,
  logging: false,
//   entities: ["src/models/**/*.ts"],
  entities: ["src/models/*.ts"],
  migrations: ["src/migration/**/*.ts"],
});
