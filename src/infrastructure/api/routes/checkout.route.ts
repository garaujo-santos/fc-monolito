import { Router, Request, Response } from "express";
import CheckoutFacadeFactory from "../../../modules/checkout/factory/checkout.facade.factory";

const checkoutRouter = Router();

const facade = CheckoutFacadeFactory.create();

checkoutRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { clientId, products } = req.body;

    const order = await facade.checkout({
      clientId,
      products
    });

    return res.status(201).json(order);
  } catch (err) {
    return res.status(400).json({
      message: (err as Error).message || "Error placing order"
    });
  }
});

export default checkoutRouter;
