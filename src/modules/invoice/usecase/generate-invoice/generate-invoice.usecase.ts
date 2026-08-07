import UseCaseInterface from "../../../@shared/usecase/use-case.interface";

import InvoiceGateway from "../../gateway/invoice.gateway";

import InvoiceItem from "../../domain/entities/invoice-item.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.dto";
import Address from "../../../@shared/domain/value-object/address";
import Invoice from "../../domain/entities/invoice.entity";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) { }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address({
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
    });

    const items = input.items.map(
      (item) =>
        new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        })
    );

    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address,
      items,
    });

    const persistedInvoice = await this.invoiceRepository.save(invoice);

    return {
      id: persistedInvoice.id.id,
      name: persistedInvoice.name,
      document: persistedInvoice.document,
      street: persistedInvoice.address.street,
      number: persistedInvoice.address.number,
      complement: persistedInvoice.address.complement,
      city: persistedInvoice.address.city,
      state: persistedInvoice.address.state,
      zipCode: persistedInvoice.address.zipCode,
      items: persistedInvoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: persistedInvoice.total,
    };
  }
}
