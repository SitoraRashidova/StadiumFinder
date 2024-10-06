import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import { UserWallet } from './models/user_wallet.model';
export declare class UserWalletService {
    private userWalletModel;
    constructor(userWalletModel: typeof UserWallet);
    create(createUserWalletDto: CreateUserWalletDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, updateUserWalletDto: UpdateUserWalletDto): any;
    remove(id: number): any;
}
