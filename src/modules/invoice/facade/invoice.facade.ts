import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface from "./facade.interface";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "../usecase/generate-invoice/generate-invoice.dto";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "../usecase/find-invoice/find-invoice.dto";

export default class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(
    private generateInvoiceUseCase: UseCaseInterface,
    private findInvoiceUseCase: UseCaseInterface
  ) {}

  async generate(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    return this.generateInvoiceUseCase.execute(input);
  }

  async find(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    return this.findInvoiceUseCase.execute(input);
  }
}
