import express from 'express';
import 'reflect-metadata';

import productRoutes from './routes/product.routes';
import invoiceRoutes from './routes/invoice.routes';
import { AppDataSource } from './data-source';

const app = express();

const port = 3000;

// Initialize Database
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to PostgreSQL Database");
  })
  .catch((error) => console.error("Database connection error:", error));

app.get("/", (req, res)=> {
    res.send({"message": "Server home."});
});

app.use("/products", productRoutes);
app.use("/invoice", invoiceRoutes);

app.listen(port, () => {
    console.log(`Started and running on port ${port}`);
});
