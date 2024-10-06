import { UserWalletService } from './user_wallet.service';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
export declare class UserWalletController {
    private readonly userWalletService;
    constructor(userWalletService: UserWalletService);
    create(createUserWalletDto: CreateUserWalletDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateUserWalletDto: UpdateUserWalletDto): any;
    remove(id: string): any;
}
