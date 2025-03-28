import { AppDataSource } from "../data-source"
import { Vendor } from "../models/Vendor"

import { Request, Response } from "express";

const vendorRepo = AppDataSource.getRepository(Vendor);

export default {

    async getVendors(req: Request, res: Response) {
        try {
            const vendors = await vendorRepo.find();

            res.json(vendors);
        } catch(e) {
            res.status(500).json({message: "Failed to get vendors"})
        }
    },

    async getVendorById(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const vendor = await vendorRepo.findOneByOrFail({ id: id });

            res.json(vendor);
        } catch(e) {
            res.status(404).json({message: `Failed to get vendor with id ${id}`})
        }
    },

    async createVendor(req: Request, res: Response) {
        try {
            const vendor = vendorRepo.create(req.body);
            await vendorRepo.save(vendor);

            res.status(201).json({message: "Vendor created"})
        } catch(e) {
            res.status(400).json({message: "Please provide a valid request with the required body"})
            return;
        }
    },

    async updateVendor(req: Request, res: Response) {
        const id = req.params.id;

        try {
            await vendorRepo.update(id, req.body);

            res.status(201).json({message: `Vendor ${id} updated`})
        } catch(e) {
            res.status(400).json({message: `Vendor ${id} not found for updating or invalid body provided`})
            return;
        }
    }

}