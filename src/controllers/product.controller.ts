import { AppDataSource } from "../data-source";
import { Product } from "../models/Product";
import { Request, Response } from "express";


const productRepo = AppDataSource.getRepository(Product);

export default {
    async createProduct(req: Request, res: Response) {

        const data = req.body;
        if (!data.stockEntries) {
            data.stockEntries = [];
        }
        else {
            res.status(501).json({message: "Server Error (Unimplemented): Passed stock entries upon creating product. stockEntries of list of type Map need to be converted to their respective Entity/Model."});
            return;
        }
        if (!data.invoices) {
            data.invoices = [];
        } else {
            res.status(501).json({message: "Server Error (Unimplemented): Passed invoices upon creating product. invoices of list of type Map need to be converted to their respective Entity/Model."});
            return;
        }

        const product = productRepo.create(data);
        await productRepo.save(product);
        res.status(201).json(product);
    },

    async getAllProducts(req: Request, res: Response) {
        const products = await productRepo.find();
        res.json(products);
    },

    async getProductById(req: Request, res: Response) {
        const product = await productRepo.findOneBy({ id: req.params.id });
        if (!product) {
            res.status(404).json({"message": "Product not found"});
            return;
        }

        res.json(product);
    },

    async updateProduct(req: Request, res: Response) {
        await productRepo.update(req.params.id, req.body);
        res.json({message: "Product updated"});
    },

    async deleteProduct(res: Response, req: Request) {
        await productRepo.delete(req.params.id);
        res.json({message: "Product deleted"});
    }
}