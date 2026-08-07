export interface CheckoutFacadeInputDto {
  clientId: string;
  products: { productId: string }[];
}

export interface CheckoutFacadeOutputDto {
  id: string;
  status: string
  total: number;
  products: {
    productId: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export default interface CheckoutFacadeInterface {
  checkout(input: CheckoutFacadeInputDto): Promise<CheckoutFacadeOutputDto>;
}