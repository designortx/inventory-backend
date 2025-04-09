import { LocalResponse } from "../controllers/helpers/localResponse.helpers";
import { AppDataSource } from "../data-source";
import { PricingList } from "../models/PricingList";

import { Request, response, Response } from "express";

const pricingListRepo = AppDataSource.getRepository(PricingList);

export default {

    async getAll(req: Request, res: Response) {
        const pricingLists = await pricingListRepo.find();

        res.json(pricingLists);
    },

    async createPricingList(req: Request, res: Response) : Promise<LocalResponse> {

        const data = req.body;

        delete data.id;

        var pricingListId: number;

        var responseCode: number;
        try {
            const pricingList = await pricingListRepo.findOneByOrFail(data);
            responseCode = 409;

            pricingListId = pricingList.id;

            console.log(`pricing list ${pricingListId} already exists, aborting creation...`)
        } catch(e) {
            console.log(`creating new pricing list`);

            // Only create new Pricing List if one doesn't exist
            const pricingList = pricingListRepo.create(data);

            await pricingListRepo.save(pricingList);

            pricingListId = (await pricingListRepo.findOneBy(pricingList))!.id;
            
            responseCode = 201;
        }

        const message = responseCode == 201? "PricingList successfully created" : "PricingList with provided details already exists";

        return new LocalResponse(
            responseCode,
            {
                id: pricingListId,
                message: message,
            }
        );
    }
};
