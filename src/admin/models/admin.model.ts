import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  login: string;
  tg_link: string;
  admin_photo: string;
  hashed_password: string;
  is_creator: boolean;
  is_active: boolean;
hashed_refresh_password: string;
}

@Table({ tableName: "admin", timestamps: false })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  login: string;

  @Column({ type: DataType.STRING })
  admin_photo: string;

  @Column({ type: DataType.STRING })
  hashed_password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_creator: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;
  
  @Column({ type: DataType.STRING })
  hashed_refresh_password: string;

  @Column({ type: DataType.STRING })
  hashed_refresh_token: string;
}
