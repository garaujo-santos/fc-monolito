import { Sequelize } from "sequelize-typescript";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceModel from "../../repository/invoice.model";
import FindInvoiceUseCase from "./find-invoice.usecase";
import InvoiceRepository from "../../repository/invoice.repository";
import Invoice from "../../domain/invoice";
import Address from "../../domain/value-objects/address.value-object";
import InvoiceItem from "../../domain/entities/invoice-item.entity";

describe("FindInvoiceUseCase", () => {
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

  it("should find an invoice by id", async () => {
    const repository = new InvoiceRepository();
    const useCase = new FindInvoiceUseCase(repository);

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
    const output = await useCase.execute({ id: savedInvoice.id.id });

    expect(output.id).toBe(savedInvoice.id.id);
    expect(output.name).toBe("Test Invoice");
    expect(output.address.city).toBe("Test City");
    expect(output.items).toHaveLength(1);
    expect(output.total).toBe(100);
  });
});
