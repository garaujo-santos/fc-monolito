import { DataTypes, Sequelize } from "sequelize";

export const up = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.getQueryInterface().createTable("invoiceItems", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    invoice_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "invoices",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });
};

export const down = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.getQueryInterface().dropTable("invoiceItems");
};
