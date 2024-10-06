import { Model } from "sequelize-typescript";
interface ICategoryCreationAttr {
    name: string;
}
export declare class Category extends Model<Category, ICategoryCreationAttr> {
    id: number;
    name: string;
    parent_id: number;
    parentId: Category;
}
export {};
