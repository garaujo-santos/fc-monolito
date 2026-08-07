import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

const productRouter = express.Router();

const facade = ProductAdmFacadeFactory.create();

productRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { id, name, description, purchasePrice, salesPrice, stock } = req.body;

    await facade.addProduct({
      id,
      name,
      description,
      purchasePrice,
      salesPrice,
      stock
    });

    return res.status(201).json({
      id,
      name,
      description,
      purchasePrice,
      salesPrice,
      stock,
      createdAt: new Date()
    });
  } catch (err) {
    return res.status(400).json({
      message: (err as Error).message || "Error creating product"
    });
  }
});

export default productRouter;
