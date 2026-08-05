import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../../repository/invoice.model";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";
import InvoiceRepository from "../../repository/invoice.repository";

describe("GenerateInvoiceUseCase", () => {
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

  it("should generate an invoice", async () => {
    const repository = new InvoiceRepository();
    const useCase = new GenerateInvoiceUseCase(repository);

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
        {
          id: "item2",
          name: "Item 2",
          price: 50,
        },
      ],
    };

    const output = await useCase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.address.city).toBe(input.city);
    expect(output.items).toHaveLength(2);
    expect(output.total).toBe(150);
  });
});
