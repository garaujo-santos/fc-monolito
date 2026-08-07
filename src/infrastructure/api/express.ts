import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import productRoute from "./routes/product.route";
import clientRoute from "./routes/client.route";
import checkoutRoute from "./routes/checkout.route";
import invoiceRoute from "./routes/invoice.route";

// Import all models
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductCheckoutModel } from "../../modules/checkout/repository/product-checkout.model";
import { ClientCheckoutModel } from "../../modules/checkout/repository/client-checkout.model";
import { OrderModel } from "../../modules/checkout/repository/order.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import ProductCatalogModel from "../../modules/store-catalog/repository/product.model";
import StoreCatalogProductModel from "../../modules/store-catalog/repository/product.model";
import { InvoiceItemsModel } from "../../modules/invoice/repository/invoice-items.model";

import clientRouter from "./routes/client.route";
import productRouter from "./routes/product.route";
import { Umzug } from "umzug";
import {join} from "path";
import { migrator } from "../../migrations/config-migrations/migrator";


export const app: Express = express();
app.use(express.json());
app.use("/client", clientRouter)
app.use("/product", productRouter)
app.use("/checkout", checkoutRoute)
app.use("/invoice", invoiceRoute)


export let sequelize: Sequelize;
export let migration: Umzug<any>;

export async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: join(__dirname, "../database.sqlite"),
    logging: false,
  });

  await sequelize.addModels([
    ProductModel,
    ClientModel,
    OrderModel,
    ProductCheckoutModel,
    StoreCatalogProductModel,
    ClientCheckoutModel,
    TransactionModel,
    InvoiceModel,
    InvoiceItemsModel,
    ProductCatalogModel
  ]);

  migration = migrator(sequelize)
  await migration.up()
}

// Initialize database
const dbPromise = setupDb();

// Register routes
app.use("/products", productRoute);
app.use("/clients", clientRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export { dbPromise };
