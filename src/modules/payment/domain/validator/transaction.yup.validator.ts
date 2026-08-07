import * as yup from "yup";
import ValidatorInterface from "../../../@shared/domain/validator/validator.interface";
import Transaction from "../transaction";


export default class TransactionYupValidator
  implements ValidatorInterface<Transaction> {
  validate(entity: Transaction): void {
    try {
      yup
        .object()
        .shape({
          amount: yup.number().positive("Amount must be greater than zero").required("Amount is required"),
          orderId: yup.string().required("orderId is required"),
        })
        .validateSync(
          {
            amount: entity.amount,
            orderId: entity.orderId
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "transaction",
          message: error,
        });
      });
    }
  }
}
