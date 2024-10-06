import { Model } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
interface IAddressCreationAttr {
    user_id: number;
    address_name: string;
    address: string;
    location: string;
    last_state: string;
}
export declare class Address extends Model<Address, IAddressCreationAttr> {
    id: number;
    user_id: number;
    address_name: string;
    address: string;
    location: string;
    last_state: string;
    user: User;
}
export {};
