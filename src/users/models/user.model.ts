import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript"
import { toDefaultValue } from "sequelize/types/utils";
import { UserCard } from "../../user_card/models/user_card.model";
import { UserWallet } from "../../user_wallet/models/user_wallet.model";


interface IUserCreationAttr{
    full_name:string,
    email:string,
    phone:string,
    tg_link:string
    hashed_password:string
    photo:string
    userCard:number;
    userWallet:string

}
@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "User  unique id ",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  full_name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;
  @Column({ type: DataType.STRING, allowNull: false })
  tg_link: number;
  @Column({ type: DataType.STRING, allowNull: false })
  hashed_password: string;

  @Column({ type: DataType.STRING })
  photo: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_owner: boolean;
  @Column({ type: DataType.STRING })
  hashed_refresh_token: string;
  @Column({ type: DataType.STRING, defaultValue: false })
  activation_link: string;

  @HasMany(() => UserCard)
  userCard: UserCard[];

  @HasMany(() => UserWallet)
  userWallet: UserWallet[];
}
