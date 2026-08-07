import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import CheckoutFacadeInterface, { CheckoutFacadeInputDto, CheckoutFacadeOutputDto } from "./facade.interface";

export default class CheckoutFacade implements CheckoutFacadeInterface {
  private _placeOrderUseCase: UseCaseInterface;

  constructor(placeOrderUseCase: UseCaseInterface) {
    this._placeOrderUseCase = placeOrderUseCase;
  }

  async checkout(input: CheckoutFacadeInputDto): Promise<CheckoutFacadeOutputDto> {
    return await this._placeOrderUseCase.execute(input);
  }
}