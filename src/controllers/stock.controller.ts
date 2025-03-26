import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Stock } from "../models/Stock";
import { Product } from "../models/Product";

const stockRepo =  AppDataSource.getRepository(Stock);
const productRepo =  AppDataSource.getRepository(Product);

export default {
    async updateStock(req: Request, res: Response) {

        const stockData = req.body;

        const productId = req.params.id;
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