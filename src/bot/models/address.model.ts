import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Bot } from "./bot.model";

interface IAddressCreationAttr {
  user_id: number;
  address_name: string;
  address: string;
  location: string;
  last_state: string;
}
@Table({ tableName: "address" })
export class Address extends Model<Address, IAddressCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => Bot)
  @Column({
    type: DataType.BIGINT,
  })
  user_id: number;
  @Column({
    type: DataType.STRING,
  })
  address_name: string;
  @Column({
    type: DataType.STRING,
  })
  address: string;
  @Column({
    type: DataType.STRING,
  })
  location: string;
  @Column({
    type: DataType.STRING,
  })
  last_state: string;
  @BelongsTo(() => Bot)
  user: User;
}
