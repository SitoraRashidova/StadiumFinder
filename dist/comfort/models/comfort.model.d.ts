import { Model } from "sequelize-typescript";
interface IComfortCreationAttr {
    name: string;
}
export declare class Comfort extends Model<Comfort, IComfortCreationAttr> {
    id: number;
    name: string;
}
export {};
