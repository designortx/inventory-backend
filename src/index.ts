import express from 'express';
import 'reflect-metadata';

import productRoutes from './routes/product.routes';
import invoiceRoutes from './routes/invoice.routes';
import stockRoutes from './routes/stock.routes';
import vendorRoutes from './routes/vendor.routes';
import { AppDataSource } from './data-source';

const app = express();

const PORT = 3000;

// Initialize Database
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to PostgreSQL Database");
  })
  .catch((error) => console.error("Database connection error:", error));

app.get("/", (req, res)=> {
    res.send({"message": "Server home."});
});

// Routes
app.use("/products", productRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/stock", stockRoutes);
app.use("/vendor", vendorRoutes)

/// Start backend and listen at port [PORT]
app.listen(PORT, () => {
    console.log(`Started and running on port ${PORT}`);
});
