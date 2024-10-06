import { Model } from "sequelize-typescript";
interface IAdminCreationAttr {
    login: string;
    tg_link: string;
    admin_photo: string;
    hashed_password: string;
    is_creator: boolean;
    is_active: boolean;
    hashed_refresh_password: string;
}
export declare class Admin extends Model<Admin, IAdminCreationAttr> {
    id: number;
    login: string;
    admin_photo: string;
    hashed_password: string;
    is_creator: boolean;
    is_active: boolean;
    hashed_refresh_password: string;
    hashed_refresh_token: string;
}
export {};
