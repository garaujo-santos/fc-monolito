import * as yup from "yup";
import ValidatorInterface from "../../../@shared/domain/validator/validator.interface";
import Invoice from "../entities/invoice.entity";


export default class InvoiceYupValidator
  implements ValidatorInterface<Invoice> {
  validate(entity: Invoice): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required("Name is required"),
          document: yup.string().required("Document is required"),

        })
        .validateSync(
          {
            name: entity.name,
            document: entity.document
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "invoice",
          message: error,
        });
      });
    }
  }
}
