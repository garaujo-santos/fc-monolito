import express, { Express } from "express";
import request from "supertest";
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import { migrator } from "../../../migrations/config-migrations/migrator";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { mockClientInputAdd, mockClientInputNotAdd } from "../mock/client.mock";
import clientRouter from "../routes/client.route";

describe("E2E test for client", () => {
  const app: Express = express()
  app.use(express.json())
  app.use("/client", clientRouter)

  let sequelize: Sequelize

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ClientModel])
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

  it("should add a client", async () => {
    const input = mockClientInputAdd

    const response = await request(app)
      .post("/client")
      .send(input);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Lucian");

  });

  it("should not add a client", async () => {
    const input = mockClientInputNotAdd

    const response = await request(app)
      .post("/client")
      .send(input);


    expect(response.status).toBe(400);
  });
});
