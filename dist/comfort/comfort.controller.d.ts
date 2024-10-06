import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
export declare class ComfortController {
    private readonly comfortService;
    constructor(comfortService: ComfortService);
    create(createComfortDto: CreateComfortDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateComfortDto: UpdateComfortDto): any;
    remove(id: string): any;
}
