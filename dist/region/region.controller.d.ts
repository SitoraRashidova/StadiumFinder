import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
export declare class RegionController {
    private readonly regionService;
    constructor(regionService: RegionService);
    create(createRegionDto: CreateRegionDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateRegionDto: UpdateRegionDto): any;
    remove(id: string): any;
}
