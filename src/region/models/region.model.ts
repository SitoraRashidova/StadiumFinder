import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { District } from "../../district/models/district.model";

interface IRegion {
  name: string;
}

@Table({ tableName: "region", timestamps: false })
export class Region extends Model<Region, IRegion> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  name: string;



  @HasMany(() => District)
  district: District[];



  
}
