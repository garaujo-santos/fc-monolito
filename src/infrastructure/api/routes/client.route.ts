import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import Address from "../../../modules/@shared/domain/value-object/address";

const clientRouter = express.Router();

const facade = ClientAdmFacadeFactory.create();

clientRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { id, name, email, document, street, number, complement, city, state, zipCode } = req.body;

    const address = new Address({
      street,
      number,
      complement,
      city,
      state,
      zipCode
    });

    await facade.add({
      id,
      name,
      email,
      document,
      address
    });

    return res.status(201).json({
      id,
      name,
      email,
      document,
      address,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } catch (err) {
    return res.status(400).json({
      message: (err as Error).message || "Error creating client"
    });
  }
});


export default clientRouter;
