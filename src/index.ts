import express from 'express';
import 'reflect-metadata';

import productRoutes from './routes/product.routes';
import invoiceRoutes from './routes/invoice.routes';
import invoiceItemRoutes from './routes/invoiceItem.routes';
import stockRoutes from './routes/stock.routes';
import partyRoutes from './routes/party.routes';
import pricingListRoutes from './routes/pricingList.routes';
import buyingUnitsRoutes from './routes/buyingUnits.routes';
import sellingUnitsRoutes from './routes/sellingUnits.routes';
import dahsboardOverviewRoutes from './routes/dahsboardOverview.routes';
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
      "party":{
         "id":"GS-002",
         "name":"Gizmo Solutions",
         "type":"vendor",
         "location":null
      },
      "invoiceNumber":"2343",
      "issueDate":"15/04/2025",
      "dueDate":null,
      "tax":0,
      "poSoNumber":"",
      "notes":"",
      "delivery":{
         "status":"Ongoing",
         "dueDate":""
      },
      "paymentMethod":null,
      "subTotal":7753.001867484869,
      "items":[
         {
            "product":{"id":"PRD-10000","name":"Rubber Seal Strip Roll","barcode":1,"category":"Packaging & Insulation","stockingUnit":"roll","unitPrice":8.78,"buyingUnits":{"id":1,"isBuyingUnits":true,"unit":"meter","relationship":50,"relationBy":"meter per roll"},"sellingUnits":{"id":1,"isBuyingUnits":false,"unit":"meter","relationship":54,"relationBy":"meter per roll"},"pricingList":{"id":1,"web":null,"premium":null,"retail":null,"wholesale":null,"referral":null}},
            "measure":5,
            "cost":77.53001867484869,
            "amount":7753.001867484869,
            "invoice":2343
         }
      ],
      "items in stock desc": 'every item unit is going to count as an item in stock. For roll, one roll is going to equal to one item_in_stock.'
   });
});

// Routes
app.use("/products", productRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/invoiceItems", invoiceItemRoutes);
app.use("/stock", stockRoutes);
app.use("/party", partyRoutes);
app.use("/pricinglist", pricingListRoutes);
app.use("/units/buying", buyingUnitsRoutes);
app.use("/units/selling", sellingUnitsRoutes);
app.use("/dashboard", dahsboardOverviewRoutes);

/// Start backend and listen at port [PORT]
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Started and running on port ${PORT}`);
});
