import { DistrictService } from "./district.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
export declare class DistrictController {
    private readonly districtService;
    constructor(districtService: DistrictService);
    create(createDistrictDto: CreateDistrictDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateDistrictDto: UpdateDistrictDto): any;
    remove(id: string): any;
}
