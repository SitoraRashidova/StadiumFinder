import { Model } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
interface IUserCardCreationAttr {
    name: string;
    phone: string;
    number: string;
    year: string;
    month: string;
    is_main: boolean;
    userId: number;
}
export declare class UserCard extends Model<UserCard, IUserCardCreationAttr> {
    id: number;
    name: string;
    phone: string;
    number: string;
    year: string;
    month: string;
    is_main: boolean;
    userId: number;
    user: User;
}
export {};
