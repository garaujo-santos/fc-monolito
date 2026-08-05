import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import Address from "../domain/value-objects/address.value-object";
import InvoiceItem from "../domain/entities/invoice-item.entity";

describe("InvoiceRepository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create and save an invoice", async () => {
    const repository = new InvoiceRepository();

    const address = new Address({
      street: "Test Street",
      number: "123",
      complement: "Apt 1",
      city: "Test City",
      state: "TS",
      zipCode: "12345-678",
    });

    const items = [
      new InvoiceItem({
        id: new Id("item1"),
        name: "Item 1",
        price: 100,
      }),
    ];

    const invoice = new Invoice({
      id: new Id("1"),
      name: "Test Invoice",
      document: "123456789",
      address,
      items,
    });

    const savedInvoice = await repository.save(invoice);

    expect(savedInvoice.id).toBeDefined();
    expect(savedInvoice.name).toBe("Test Invoice");
    expect(savedInvoice.address.city).toBe("Test City");
  });

  it("should find an invoice by id", async () => {
    const repository = new InvoiceRepository();

    const address = new Address({
      street: "Test Street",
      number: "123",
      complement: "Apt 1",
      city: "Test City",
      state: "TS",
      zipCode: "12345-678",
    });

    const items = [
      new InvoiceItem({
        id: new Id("item1"),
        name: "Item 1",
        price: 100,
      }),
    ];

    const invoice = new Invoice({
      id: new Id("2"),
      name: "Test Invoice",
      document: "123456789",
      address,
      items,
    });

    const savedInvoice = await repository.save(invoice);
    const foundInvoice = await repository.find(savedInvoice.id.id);

    expect(foundInvoice.id.id).toBe(savedInvoice.id.id);
    expect(foundInvoice.name).toBe("Test Invoice");
    expect(foundInvoice.address.city).toBe("Test City");
    expect(foundInvoice.items[0].name).toBe("Item 1");
  });
});
