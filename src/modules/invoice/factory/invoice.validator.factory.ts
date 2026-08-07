import ValidatorInterface from "../../@shared/domain/validator/validator.interface";
import Invoice from "../domain/entities/invoice.entity";
import InvoiceYupValidator from "../domain/validator/invoice.yup.validator";

export default class InvoiceValidatorFactory {
  static create(): ValidatorInterface<Invoice> {
    return new InvoiceYupValidator();
  }
}
