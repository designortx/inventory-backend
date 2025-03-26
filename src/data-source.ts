import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3360,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    entities: [__dirname + 'models/*.ts'],
    synchronize: true,
    logging: true
});

AppDataSource.initialize()
    .then(()=> console.log("Database connected"))
    .catch((err)=> console.error("Database connection error: ", err));