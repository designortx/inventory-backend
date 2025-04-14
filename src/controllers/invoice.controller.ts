import { get } from "http";
import { AppDataSource } from "../data-source"
import { Invoice } from "../models/Invoice"

import { Request, Response } from "express";
import { Product } from "../models/Product";
import { Delivery } from "../models/Devliery";
import invoiceItemController from "./invoiceItem.controller";
import partyController from "./party.controller";
import { Party } from "../models/Party";

const invoiceRepo = AppDataSource.getRepository(Invoice);
const productRepo = AppDataSource.getRepository(Product);
const deliveryRepo = AppDataSource.getRepository(Delivery);

export default {
    async createInvoice(req: Request, res: Response) {

        const data = req.body;

        console.log(`invoice body received: ${JSON.stringify(data)}`);

        // find and update product to the Product Entity in the payload
        // const product = await productRepo.findOneBy({ id: data.product.id });
        // data.product = product;

        // create and update delivery to the Delivery Entity in the payload
        const delivery = deliveryRepo.create(data.delivery);
        const savedDelivery = await deliveryRepo.save(delivery);
        data.delivery = savedDelivery;

        // Create and save invoice items
        const invoiceItems = data.items;
        await invoiceItemController.createInvoiceItems(invoiceItems);

        // Assign the Party (Vendor or Customer)
        const partyId = data.party.id;
        const partyType = data.party.type;
        var party: Party;
        try {
            party = await partyController.getParty(partyId);
        } catch(e) {
            res.status(404).json({message: `Invoice creation failed. ${partyType} ${partyId} not found when creating invoice`});
            return;
        }

        const invoice = invoiceRepo.create(data);
        const savedInvoice = await invoiceRepo.save(invoice);
        
        // Invoice ID/Number
        const invoiceId = savedInvoice[0].id;
        res.status(201).json({message: `Invoice created ${invoiceId}`});
    },

    async getAllInvoices(req: Request, res: Response) {
        const invoices = await invoiceRepo.find();
        res.json(invoices);
    },

    async getInvoiceById(req: Request, res: Response) {
        const invoice = await invoiceRepo.findBy({ id: Number(req.params.id) });
        if (!invoice) {
            res.status(404).json({message: "Invoice not found"})
            return;
        }

        res.json(invoice);
    },


    async updateInvoice(req: Request, res: Response) {
        try {
            await invoiceRepo.update(req.params.id, req.body);
            
            res.json({message: `Invoice updated ${req.params.id}`});
        } catch(e) {
            res.status(404).json({message: "Invoice not found"});
        }
    },

    async deleteInvoice(req: Request, res: Response) {
        await invoiceRepo.delete(req.params.id);
        res.json({message: `Invoice deleted ${req.params.id}`});
    } 
}