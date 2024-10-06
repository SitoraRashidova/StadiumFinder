import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface IUserCardCreationAttr {
  name: string;
  phone: string;
  number: string;
  year: string;
  month: string;
  is_main:boolean;
  userId:number
}
@Table({ tableName: "user_card" })
export class UserCard extends Model<UserCard, IUserCardCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "User  unique id ",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;
  @Column({ type: DataType.STRING, allowNull: false })
  number: string;
  @Column({ type: DataType.STRING, allowNull: false })
  year: string;
  @Column({ type: DataType.STRING, allowNull: false })
  month: string;
  @Column({ type: DataType.STRING, defaultValue: false })
  is_main: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
  @BelongsTo(()=>User)
  user:User
}
