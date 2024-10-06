import { Model } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
interface ICarCreationAttr {
    user_id: number;
    car_number: string;
    model: string;
    color: string;
    year: string;
    last_state: string;
}
export declare class Car extends Model<Car, ICarCreationAttr> {
    id: number;
    user_id: number;
    car_number: string;
    model: string;
    color: string;
    year: string;
    last_state: string;
    user: User;
}
export {};
