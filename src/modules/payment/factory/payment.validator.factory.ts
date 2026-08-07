import ValidatorInterface from "../../@shared/domain/validator/validator.interface";
import Transaction from "../domain/transaction";
import TransactionYupValidator from "../domain/validator/transaction.yup.validator";


export default class PaymentValidatorFactory {
  static create(): ValidatorInterface<Transaction> {
    return new TransactionYupValidator();
  }
}
