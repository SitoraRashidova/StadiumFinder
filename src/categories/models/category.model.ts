import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface ICategoryCreationAttr {
  name: string;

}

@Table({ tableName: "categories", timestamps: false })
export class Category extends Model<Category, ICategoryCreationAttr> {
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;



  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  parent_id: number;

  @BelongsTo(() => Category)
  parentId: Category;
}