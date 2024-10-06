import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { UserCard } from './models/user_card.model';
export declare class UserCardService {
    private userCardModel;
    constructor(userCardModel: typeof UserCard);
    create(createUserCardDto: CreateUserCardDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, updateUserCardDto: UpdateUserCardDto): any;
    remove(id: number): any;
}
