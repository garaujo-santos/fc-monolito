import { DataTypes, Sequelize } from "sequelize";

export const up = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.getQueryInterface().createTable("orderProducts", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salesPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });
};

export const down = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.getQueryInterface().dropTable("orderProducts");
};
