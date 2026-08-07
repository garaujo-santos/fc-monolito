import ValidatorInterface from "../domain/validator/validator.interface";
import Address from "../domain/value-object/address";
import AddressYupValidator from "../validator/address.yup.validator";

export default class AddressValidatorFactory {
  static create(): ValidatorInterface<Address> {
    return new AddressYupValidator();
  }
}
