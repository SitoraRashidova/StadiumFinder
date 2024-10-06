import { Model } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
interface IUserWalletCreationAttr {
    userId: number;
    wallet: string;
}
export declare class UserWallet extends Model<UserWallet, IUserWalletCreationAttr> {
    id: number;
    wallet: string;
    userId: User;
    user: User;
}
export {};
