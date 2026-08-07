import * as yup from "yup";
import ValidatorInterface from "../../../@shared/domain/validator/validator.interface";
import InvoiceItem from "../entities/invoice-item.entity";



export default class InvoiceItemsYupValidator
  implements ValidatorInterface<InvoiceItem> {
  validate(entity: InvoiceItem): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required("Name is required"),
          price: yup.number().positive("Price must be greater than zero").required("Price is required"),

        })
        .validateSync(
          {
            name: entity.name,
            price: entity.price
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "invoice-items",
          message: error,
        });
      });
    }
  }
}
