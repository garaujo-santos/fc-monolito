import Id from "../../@shared/domain/value-object/id.value-object";

import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import InvoiceItem from "../domain/entities/invoice-item.entity";
import Address from "../../@shared/domain/value-object/address";
import { mockClientInputNotAdd } from "../../../infrastructure/api/mock/client.mock";
import { InvoiceItemsModel } from "./invoice-items.model";
import Invoice from "../domain/entities/invoice.entity";

export default class InvoiceRepository implements InvoiceGateway {
  async save(input: Invoice): Promise<Invoice> {
    const addressData = {
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      city: input.address.city,
      state: input.address.state,
      zipCode: input.address.zipCode,
    };

    const itemsData = input.items.map((item) => ({
      id: item.id.id,
      name: item.name,
      price: item.price,
    }));

    await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      city: input.address.city,
      state: input.address.state,
      zipCode: input.address.zipCode,
      items: input.items.map((item: InvoiceItem) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      })),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    },
      {
        include: [{ model: InvoiceItemsModel }]
      }
    );

    return input;
  }

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: [InvoiceItemsModel]
    });

    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    const itemsData = invoice.items;

    const address = new Address({
      street: invoice.street,
      number: invoice.number,
      complement: invoice.complement,
      city: invoice.city,
      state: invoice.state,
      zipCode: invoice.zipCode,
    });

    const items = itemsData.map(
      (item: { id: string; name: string; price: number }) =>
        new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        })
    );

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: address,
      items: items,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }
}
