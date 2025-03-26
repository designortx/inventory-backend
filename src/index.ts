import express from 'express';
import 'reflect-metadata';

import productRoutes from './routes/product.routes';
import invoiceRoutes from './routes/invoice.routes';

const app = express();

const port = 3000;

app.get("/", (req, res)=> {
    res.send({"message": "Server home."});
});

app.use("/products", productRoutes);
app.use("/invoice", invoiceRoutes);

app.listen(port, () => {
    console.log(`Started and running on port ${port}`);
});
