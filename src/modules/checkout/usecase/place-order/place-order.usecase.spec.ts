import { PlaceOrderInputDto } from './place-order.dto';
import PlaceOrderUseCase from "./place-order.usecase";
import Id from '../../../@shared/domain/value-object/id.value-object';
import Product from '../../domain/product.entity';

const mockDate = new Date(2000, 1, 1);

const mockClient = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  document: "123456789",
  address: {
    street: "Rua A",
    number: "100",
    complement: "Apt 1",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-100"
  }
};

describe("PlaceOrderUseCase unit tests", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("execute method", () => {
    it("should throw an error when client not found", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null)
      };

      const mockProductFacade = {
        checkStock: jest.fn()
      };

      const mockCatalogFacade = {
        find: jest.fn()
      };

      const mockInvoiceFacade = {
        generate: jest.fn()
      };

      const mockPaymentFacade = {
        process: jest.fn()
      };

      const mockRepository = {
        addOrder: jest.fn(),
        findOrder: jest.fn()
      };

      const placeOrderUseCase = new PlaceOrderUseCase({
        clientFacade: mockClientFacade as any,
        productFacade: mockProductFacade as any,
        catalogFacade: mockCatalogFacade as any,
        repository: mockRepository as any,
        invoiceFacade: mockInvoiceFacade as any,
        paymentFacade: mockPaymentFacade as any
      });

      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: [{ productId: "1" }]
      };

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error("Client not found")
      );
    });

    it("should throw an error when no products are selected", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(mockClient)
      };

      const mockCatalogFacade = {
        find: jest.fn()
      };

      const mockProductFacade = {
        checkStock: jest.fn()
      };

      const mockInvoiceFacade = {
        generate: jest.fn()
      };

      const mockPaymentFacade = {
        process: jest.fn()
      };

      const mockRepository = {
        addOrder: jest.fn(),
        findOrder: jest.fn()
      };

      const placeOrderUseCase = new PlaceOrderUseCase({
        clientFacade: mockClientFacade as any,
        productFacade: mockProductFacade as any,
        catalogFacade: mockCatalogFacade as any,
        repository: mockRepository as any,
        invoiceFacade: mockInvoiceFacade as any,
        paymentFacade: mockPaymentFacade as any
      });

      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: []
      };

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error("No products selected")
      );
    });

    it("should throw an error when product is out of stock", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(mockClient)
      };

      const mockCatalogFacade = {
        find: jest.fn()
      };

      const mockProductFacade = {
        checkStock: jest.fn().mockResolvedValue({
          productId: "1",
          stock: 0
        })
      };

      const mockInvoiceFacade = {
        generate: jest.fn()
      };

      const mockPaymentFacade = {
        process: jest.fn()
      };

      const mockRepository = {
        addOrder: jest.fn(),
        findOrder: jest.fn()
      };

      const placeOrderUseCase = new PlaceOrderUseCase({
        clientFacade: mockClientFacade as any,
        productFacade: mockProductFacade as any,
        catalogFacade: mockCatalogFacade as any,
        repository: mockRepository as any,
        invoiceFacade: mockInvoiceFacade as any,
        paymentFacade: mockPaymentFacade as any
      });

      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: [{ productId: "1" }]
      };

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow();
    });

    it("should successfully place an order", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(mockClient)
      };

      const mockCatalogFacade = {
        find: jest.fn()
          .mockResolvedValueOnce({
            id: "1",
            name: "Product 1",
            description: "Test product 1",
            salesPrice: 100
          })
          .mockResolvedValueOnce({
            id: "2",
            name: "Product 2",
            description: "Test product 2",
            salesPrice: 200
          })
      };

      const mockProductFacade = {
        checkStock: jest.fn()
          .mockResolvedValueOnce({
            productId: "1",
            stock: 10
          })
          .mockResolvedValueOnce({
            productId: "2",
            stock: 5
          })
      };

      const mockInvoiceFacade = {
        generate: jest.fn().mockResolvedValue({
          id: "invoice-1",
          name: mockClient.name,
          document: mockClient.document,
          total: 300,
          createdAt: mockDate
        })
      };

      const mockPaymentFacade = {
        process: jest.fn().mockResolvedValue({
          transactionId: "tx-1",
          status: "approved",
          amount: 300
        })
      };

      const mockRepository = {
        addOrder: jest.fn().mockResolvedValue({
          id: "order-1",
          clientId: "1",
          products: [
            { productId: "1", salesPrice: 100 },
            { productId: "2", salesPrice: 200 }
          ],
          status: "pending",
          total: 300,
          createdAt: mockDate,
          updatedAt: mockDate
        }),
        findOrder: jest.fn()
      };

      const placeOrderUseCase = new PlaceOrderUseCase({
        clientFacade: mockClientFacade as any,
        productFacade: mockProductFacade as any,
        catalogFacade: mockCatalogFacade as any,
        repository: mockRepository as any,
        invoiceFacade: mockInvoiceFacade as any,
        paymentFacade: mockPaymentFacade as any
      });

      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: [
          { productId: "1" },
          { productId: "2" }
        ]
      };

      const output = await placeOrderUseCase.execute(input);

      expect(output).toHaveProperty("id");
      expect(output).toHaveProperty("invoiceId");
      expect(output).toHaveProperty("status");
      expect(output).toHaveProperty("total");
      expect(output.total).toBe(300);
      expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1" });
      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(2);
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(2);
      expect(mockInvoiceFacade.generate).toHaveBeenCalled();
      expect(mockPaymentFacade.process).toHaveBeenCalled();
      expect(mockRepository.addOrder).toHaveBeenCalled();
    });
  });
});
