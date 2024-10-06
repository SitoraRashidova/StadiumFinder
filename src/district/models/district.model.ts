import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Region } from "src/region/models/region.model";

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: "district", timestamps: false })
export class District extends Model<District, IDistrictCreationAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  name: string;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER })
  regionId: number;

  @BelongsTo(() => Region)
  region: Region;


}



