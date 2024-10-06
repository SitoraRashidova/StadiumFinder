import { Model } from "sequelize-typescript";
import { District } from "../../district/models/district.model";
interface IRegion {
    name: string;
}
export declare class Region extends Model<Region, IRegion> {
    id: number;
    name: string;
    district: District[];
}
export {};
