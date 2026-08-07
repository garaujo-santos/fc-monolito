
import * as yup from "yup";
import ValidatorInterface from "../domain/validator/validator.interface";
import Address from "../domain/value-object/address";

export default class AddressYupValidator
  implements ValidatorInterface<Address> {
  validate(entity: Address): void {
    try {
      yup
        .object()
        .shape({
          street: yup.string().required("Street is required"),
          number: yup.number().required("Number is required"),
          city: yup.string().required("City is required"),
          state: yup.string().required("State is required"),
          zipCode: yup.string().required("Zipcode is required"),


        })
        .validateSync(
          {
            street: entity.street,
            number: entity.number,
            zipCode: entity.zipCode,
            city: entity.city,
            state: entity.state,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "address",
          message: error,
        });
      });
    }
  }
}
