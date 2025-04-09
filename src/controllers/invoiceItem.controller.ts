import { AppDataSource } from "../data-source"
import { InvoiceItem } from "../models/InvoiceItem"

import { Request, Response } from "express";

const invoiceItemRepo = AppDataSource.getRepository(InvoiceItem);

export default {
    async createInvoiceItems(items: any) {
        const invoiceItems = invoiceItemRepo.create(items);
        await invoiceItemRepo.save(invoiceItems);
    }
}