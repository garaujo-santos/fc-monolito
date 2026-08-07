import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "./product.entity";

describe("Product unit tests", () => {
  it("should throw error when name is empty", () => {
    expect(() => {
      const input = {
        name: "",
        description: "",
        purchasePrice: -1,
        salesPrice: -1,
        stock: -1,
      }
      const product = new Product(input);
    }).toThrowError("product: Name is required,product: Description is required,product: Purchase Price must be greater than zero,product: Sales Price must be greater than zero,product: Stock must be greater than zero");
  });


  it("should create a product", () => {
    const input = {
      id: new Id('123'),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      salesPrice: 150,
      stock: 10,
    }
    const product = new Product(input);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.stock).toBe(input.stock);
  });
})