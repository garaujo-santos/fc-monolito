import { DataTypes, Sequelize } from "sequelize";

export const up = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.getQueryInterface().createTable("orders", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "orderClient",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};

export const down = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.getQueryInterface().dropTable("orders");
};
