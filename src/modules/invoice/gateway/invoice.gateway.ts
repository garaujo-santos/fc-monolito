import Invoice from "../domain/entities/invoice.entity";

export default interface InvoiceGateway {
  save(input: Invoice): Promise<Invoice>;
  find(id: string): Promise<Invoice>;
}
