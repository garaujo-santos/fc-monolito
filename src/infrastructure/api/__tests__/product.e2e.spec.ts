import { Sequelize } from "sequelize-typescript";
import express, { Express } from "express";
import request from "supertest";

import { Umzug } from "umzug";
import { mockProductInputAdd, mockProductInputNotAdd } from "../mock/product.mock";
import productRouter from "../routes/product.route";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import { migrator } from "../../../migrations/config-migrations/migrator";

describe("E2E test for product", () => {
  const app: Express = express()
  app.use(express.json())
  app.use("/product", productRouter)

  let sequelize: Sequelize

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync();
    migration = migrator(sequelize)
    await migration.up()
  })

  afterEach(async () => {
    if (!migration || !sequelize) {
      return
    }
    migration = migrator(sequelize)
    await migration.down()
    await sequelize.close()
  })

  it("should create a product", async () => {
    const input = mockProductInputAdd

    const response = await request(app)
      .post("/product")
      .send(input);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Produto 1");
    expect(response.body.purchasePrice).toBe(100);
    expect(response.body.stock).toBe(10);
  });

  it("should not create a product", async () => {
    const input = mockProductInputNotAdd

    const response = await request(app)
      .post("/product")
      .send(input);

    expect(response.status).toBe(400);
  });
});