import { BelongsTo,  Column,  DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "../../users/models/user.model";

interface IOrderAttr{
    description:string
    status:string
    date:string
}
@Table({ tableName: "order" })
export class Order extends Model<Order, IOrderAttr> {

  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.ENUM('pand','unpaid'), defaultValue:'unpaid' })
  status: string;

  @Column({ type: DataType.DATE, allowNull: false })
  date: string;

 @ForeignKey(()=>User)
 @Column({
    type:DataType.INTEGER
 })
 userId:number

 @BelongsTo(()=>User)
 user:User

}
