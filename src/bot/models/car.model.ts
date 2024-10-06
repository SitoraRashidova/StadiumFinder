import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Bot } from "./bot.model";

interface ICarCreationAttr {
  user_id: number;
  car_number: string;
  model: string;
  color: string;
  year: string;
  last_state: string;
}
@Table({ tableName: "car" })
export class Car extends Model<Car, ICarCreationAttr> {
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
    type: DataType.INTEGER,
  })
  car_number: string;
  @Column({
    type: DataType.STRING,
  })
  model: string;
  @Column({
    type: DataType.STRING,
  })
  color: string;
  @Column({
    type: DataType.STRING,
  })
  year: string;
  @Column({
    type: DataType.STRING,
  })
  last_state: string;
  @BelongsTo(() => Bot)
  user: User;
}
