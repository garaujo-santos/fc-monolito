import { Sequelize } from "sequelize-typescript";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../domain/entities/invoice-item.entity";
import Invoice from "../domain/entities/invoice.entity";
import { InvoiceItemsModel } from "./invoice-items.model";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate a invoice", async () => {
    const mockItem1 = new InvoiceItem({
      id: new Id('1'),
      name: "Product mock 1",
      price: 100,
    });

    const mockItem2 = new InvoiceItem({
      id: new Id('2'),
      name: "Product mock 2",
      price: 20,
    });
    const invoice = new Invoice({
      id: new Id('1'),
      name: "John Doe",
      document: "123456789",
      address: new Address({
        street: "Rua 123",
        number: "99",
        complement: "Casa Verde",
        city: "Criciúma",
        state: "SC",
        zipCode: "88888-888"
      }),
      items: [mockItem1, mockItem2],
    });

    const repository = new InvoiceRepository();
    await repository.save(invoice);

    const findInvoice = await InvoiceModel.findOne({ where: { id: invoice.id.id }, include: [InvoiceItemsModel] });

    expect(findInvoice.id).toBe(invoice.id.id);
    expect(findInvoice.name).toBe(invoice.name);
    expect(findInvoice.document).toBe(invoice.document);
    expect(findInvoice.items[0].id).toEqual(invoice.items[0].id.id);
    expect(findInvoice.items[1].id).toEqual(invoice.items[1].id.id);
    expect(findInvoice.street).toBe(invoice.address.street);
  });

  it("should find a invoice", async () => {

    const mockItem1 = new InvoiceItem({
      id: new Id(),
      name: "Product mock 1",
      price: 100,
    });

    const mockItem2 = new InvoiceItem({
      id: new Id(),
      name: "Product mock 2",
      price: 20,
    });
    const invoice = new Invoice({
      id: new Id(),
      name: "John Doe",
      document: "123456789",
      address: new Address({
        street: "Rua 123",
        number: "99",
        complement: "Casa Verde",
        city: "Criciúma",
        state: "SC",
        zipCode: "88888-888"
      }),
      items: [mockItem1, mockItem2],
    });

    const repository = new InvoiceRepository();
    await repository.save(invoice);

    const findInvoice = await repository.find(invoice.id.id);

    expect(findInvoice.id.id).toBe(invoice.id.id);
    expect(findInvoice.name).toBe(invoice.name);
    expect(findInvoice.document).toBe(invoice.document);
    expect(findInvoice.items[0].id).toEqual(invoice.items[0].id);
    expect(findInvoice.items[1].id).toEqual(invoice.items[1].id);
    expect(findInvoice.address.street).toBe(invoice.address.street);
  });
});
