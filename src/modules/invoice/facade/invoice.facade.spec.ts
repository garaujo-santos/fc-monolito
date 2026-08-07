import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceItemsModel } from "../repository/invoice-items.model";

describe("InvoiceFacade", () => {
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

  it("should generate an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Test Invoice",
      document: "123456789",
      street: "Test Street",
      number: "123",
      complement: "Apt 1",
      city: "Test City",
      state: "TS",
      zipCode: "12345-678",
      items: [
        {
          id: "item1",
          name: "Item 1",
          price: 100,
        },
      ],
    };

    const output = await facade.generate(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.city).toBe(input.city);
    expect(output.total).toBe(100);
  });

  it("should find an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Test Invoice",
      document: "123456789",
      street: "Test Street",
      number: "123",
      complement: "Apt 1",
      city: "Test City",
      state: "TS",
      zipCode: "12345-678",
      items: [
        {
          id: "item1",
          name: "Item 1",
          price: 100,
        },
      ],
    };

    const generatedInvoice = await facade.generate(input);
    const foundInvoice = await facade.find({ id: generatedInvoice.id });

    expect(foundInvoice.id).toBe(generatedInvoice.id);
    expect(foundInvoice.name).toBe(input.name);
    expect(foundInvoice.address.city).toBe(input.city);
    expect(foundInvoice.total).toBe(100);
  });
});
