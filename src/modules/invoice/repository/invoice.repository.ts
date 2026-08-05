import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import Address from "../domain/value-objects/address.value-object";
import InvoiceItem from "../domain/entities/invoice-item.entity";

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
      address: JSON.stringify(addressData),
      items: JSON.stringify(itemsData),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    return input;
  }

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
    });

    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    const addressData = JSON.parse(invoice.address as string);
    const itemsData = JSON.parse(invoice.items as string);

    const address = new Address({
      street: addressData.street,
      number: addressData.number,
      complement: addressData.complement,
      city: addressData.city,
      state: addressData.state,
      zipCode: addressData.zipCode,
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
      address,
      items,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }
}
