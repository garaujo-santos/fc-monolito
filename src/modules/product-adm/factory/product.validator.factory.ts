import ValidatorInterface from "../../@shared/domain/validator/validator.interface";
import Product from "../domain/product.entity";
import ProductYupValidator from "../domain/validator/product.yup.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }
}
