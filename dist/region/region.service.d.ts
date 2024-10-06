import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./models/region.model";
export declare class RegionService {
    private regionModel;
    constructor(regionModel: typeof Region);
    create(createRegionDto: CreateRegionDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, updateRegionDto: UpdateRegionDto): any;
    remove(id: number): any;
}
