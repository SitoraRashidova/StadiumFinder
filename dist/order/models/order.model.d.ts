import { Model } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
interface IOrderAttr {
    description: string;
    status: string;
    date: string;
}
export declare class Order extends Model<Order, IOrderAttr> {
    id: number;
    description: string;
    status: string;
    date: string;
    userId: number;
    user: User;
}
export {};
