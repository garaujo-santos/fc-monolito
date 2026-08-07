import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ClientCheckoutModel } from "./client-checkout.model";
import { ProductCheckoutModel } from "./product-checkout.model";


@Table({
  tableName: 'orders',
  timestamps: false
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => ClientCheckoutModel)
  @Column({ allowNull: false })
  client_id: string;

  @BelongsTo(() => ClientCheckoutModel)
  client: ClientCheckoutModel;

  @HasMany(() => ProductCheckoutModel)
  products: ProductCheckoutModel[];

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false })
  createdAt: Date

  @Column({ allowNull: false })
  updatedAt: Date
}