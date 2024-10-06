import { Model } from "sequelize-typescript";
import { UserCard } from "../../user_card/models/user_card.model";
import { UserWallet } from "../../user_wallet/models/user_wallet.model";
interface IUserCreationAttr {
    full_name: string;
    email: string;
    phone: string;
    tg_link: string;
    hashed_password: string;
    photo: string;
    userCard: number;
    userWallet: string;
}
export declare class User extends Model<User, IUserCreationAttr> {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    tg_link: number;
    hashed_password: string;
    photo: string;
    is_active: boolean;
    is_owner: boolean;
    hashed_refresh_token: string;
    activation_link: string;
    userCard: UserCard[];
    userWallet: UserWallet[];
}
export {};
