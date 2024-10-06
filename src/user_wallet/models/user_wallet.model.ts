import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface IUserWalletCreationAttr{
    userId:number
    wallet:string
}
@Table({tableName:"user_wallet"})
export class UserWallet extends Model<UserWallet,IUserWalletCreationAttr>{
  @ApiProperty({
    example: 1,
    description: "wallet unique id ",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  wallet: string;

  @ForeignKey(()=>User)
  userId:User

  @BelongsTo(()=>User)
  user:User
}
