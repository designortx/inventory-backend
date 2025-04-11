import express from 'express';
import 'reflect-metadata';

import productRoutes from './routes/product.routes';
import invoiceRoutes from './routes/invoice.routes';
import stockRoutes from './routes/stock.routes';
import partyRoutes from './routes/party.routes';
import pricingListRoutes from './routes/pricingList.routes';
import buyingUnitsRoutes from './routes/buyingUnits.routes';
import sellingUnitsRoutes from './routes/sellingUnits.routes';
import { AppDataSource } from './data-source';

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

const PORT = 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Initialize Database
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to PostgreSQL Database");
  })
  .catch((error) => console.error("Database connection error:", error));

app.get("/", (req, res)=> {
    res.send({
      "message": "Server home.",
      data: {
        "id": "PRD-10000",
        "name": "Anker PowerCore 10000 Power Bank",
        "stockingUnit": "unit",
        "unitPrice": 32,
        "buyingUnits": {
          "id": 1,
          "isBuyingUnits": true,
          "unit": "unit",
          "relationship": 0,
          "relationBy": "unit per unit"
        },
        "sellingUnits": {
          "id": 1,
          "isBuyingUnits": false,
          "unit": "unit",
          "relationship": 0,
          "relationBy": "unit per unit"
        },
        "pricingList": {
          "web": null,
          "premium": null,
          "retail": null,
          "wholesale": null,
          "referral": null
        }
      }      
    });
});

// Routes
app.use("/products", productRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/stock", stockRoutes);
app.use("/party", partyRoutes);
app.use("/pricinglist", pricingListRoutes);
app.use("/units/buying", buyingUnitsRoutes);
app.use("/units/selling", sellingUnitsRoutes);

/// Start backend and listen at port [PORT]
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Started and running on port ${PORT}`);
});
