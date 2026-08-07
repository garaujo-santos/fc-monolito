import * as yup from "yup";

import ValidatorInterface from "../../../@shared/domain/validator/validator.interface";
import Client from "../client.entity";


export default class ClientYupValidator
  implements ValidatorInterface<Client> {
  validate(entity: Client): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required("Name is required"),
          email: yup.string().email().required("Email is required"),
          document: yup.string().required("Description is required")
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            document: entity.document,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "client",
          message: error,
        });
      });
    }
  }
}
