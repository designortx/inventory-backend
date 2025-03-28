import { Router } from "express";
import VendorController from "../controllers/vendor.controller";

const router = Router();

router.get("/", VendorController.getVendors);
router.get("/:id", VendorController.getVendorById);
router.post("/", VendorController.createVendor);
router.put("/", VendorController.updateVendor);

export default router;