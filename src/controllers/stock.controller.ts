import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Stock } from "../models/Stock";
import { Product } from "../models/Product";

const stockRepo =  AppDataSource.getRepository(Stock);
const productRepo =  AppDataSource.getRepository(Product);

export default {

    async getStock(req: Request, res: Response) {
        res.json(await stockRepo.find());
    },

    async getStockById(req: Request, res: Response) {
        const stockItem = await stockRepo.findOneBy({ id: Number(req.params.id) })
        if (!stockItem) {
            res.status(404).json({message: `Stock item with id ${req.params.id} not found `})
            return;
        }

        res.json(stockItem);
    },

    async getStockByProductId(req: Request, res: Response) {
        const productId = req.params.productId;

        const product = await productRepo.findOneBy({ id: productId });
        if (!product) {
            res.status(404).json({message: `Failed to find stock item with product id ${productId}. Product not found`})
            return;
        }

        try {
            const stockItem = await stockRepo.findOneByOrFail({ product: product })

            res.json(stockItem);
        } catch(e) {
            res.status(404).json({message: `Stock information with product id ${productId} not found. err: ${e}`})
        }
    },

    async updateStock(req: Request, res: Response) {

        const stockData = req.body;

        const productId = req.params.productId;
        const product = await productRepo.findOneBy({ id: productId });

        if (!product) {
            res.status(404).json({message: `Product with id ${productId} not found for updating stock`});
            return;
        }
        // if product != null
        stockData.product = product;

        var stock = await stockRepo.findOneBy({ product: product });

        if (!stock) {
            // .create() -> type List of type Entity, in this case it's Stock[]
            // Because we can pass in multiple stock rows, we'll need to explicitly select the first Stock,
            // assuming we don't update multiple stock data rows at the same time using this function (updateStock)
            stock = stockRepo.create(stockData)[0];
        }

        await stockRepo.save(stock!);
    }
};