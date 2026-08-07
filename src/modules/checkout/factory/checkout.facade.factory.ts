import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import CheckoutFacadeInterface from "../facade/facade.interface";
import CheckoutRepository from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export default class CheckoutFacadeFactory {
  static create(): CheckoutFacadeInterface {
    const placeOrderUseCase =
      new PlaceOrderUseCase({
        catalogFacade:
          StoreCatalogFacadeFactory.create(),
        clientFacade:
          ClientAdmFacadeFactory.create(),
        invoiceFacade:
          InvoiceFacadeFactory.create(),
        paymentFacade:
          PaymentFacadeFactory.create(),
        productFacade:
          ProductAdmFacadeFactory.create(),
        repository: new CheckoutRepository()
      })

      const facade = new CheckoutFacade(placeOrderUseCase);

      return facade;
  }
}
