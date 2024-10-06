import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { Comfort } from './models/comfort.model';
export declare class ComfortService {
    private comfortModels;
    constructor(comfortModels: typeof Comfort);
    create(createComfortDto: CreateComfortDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, updateComfortDto: UpdateComfortDto): any;
    remove(id: number): any;
}
