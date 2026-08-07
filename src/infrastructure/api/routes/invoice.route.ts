import { Router, Request, Response } from "express";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";

const invoiceRouter = Router();

const facade = InvoiceFacadeFactory.create();

invoiceRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const invoice = await facade.find({
      id
    });

    return res.status(200).json(invoice);
  } catch (err) {
    return res.status(400).json({
      message: (err as Error).message || "Error fetching invoice"
    });
  }
});

export default invoiceRouter;
