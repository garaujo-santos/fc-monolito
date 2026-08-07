import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { ClientCheckoutModel } from "./client-checkout.model";
import { OrderModel } from "./order.model";
import { ProductCheckoutModel } from "./product-checkout.model";

export default class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {

    await OrderModel.create({
      id: order.id.id,
      client_id: order.client.id.id,
      client: {
        id: order.client.id.id,
        order_id: order.id.id,
        name: order.client.name,
        document: order.client.document,
        email: order.client.email,
        street: order.client.address.street,
        number: order.client.address.number,
        complement: order.client.address.complement,
        city: order.client.address.city,
        state: order.client.address.state,
        zipCode: order.client.address.zipCode,
        createdAt: order.client.createdAt,
        updatedAt: order.client.updatedAt
      },
      products: order.products.map(product => ({
        id: product.id.id,
        order_id: order.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      })),
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }, {
      include: [{ model: ProductCheckoutModel }, { model: ClientCheckoutModel }]
    })
  }

  async findOrder(id: string): Promise<Order> {

    const order = await OrderModel.findOne({ where: { id }, include: ["client", "products"] })

    if (!order) {
      throw new Error("Order not found")
    }

    return new Order({
      id: new Id(order.id),
      client: new Client({
        id: new Id(order.client.id),
        name: order.client.name,
        document: order.client.document,

        email: order.client.email,
        address: new Address({
          street: order.client.street,
          number: order.client.number,
          complement: order.client.complement,
          city: order.client.city,
          state: order.client.state,
          zipCode: order.client.zipCode
        }),
        createdAt: order.client.createdAt,
        updatedAt: order.client.updatedAt

      }),
      products: order.products.map((product) => new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      })),
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    })
  }

}