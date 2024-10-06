import { Model } from "sequelize-typescript";
import { Region } from "src/region/models/region.model";
interface IDistrictCreationAttr {
    name: string;
    regionId: number;
}
export declare class District extends Model<District, IDistrictCreationAttr> {
    id: number;
    name: string;
    regionId: number;
    region: Region;
}
export {};
