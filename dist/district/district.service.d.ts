import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { District } from "./models/district.model";
export declare class DistrictService {
    private districtModel;
    constructor(districtModel: typeof District);
    create(createDistrictDto: CreateDistrictDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, updateDistrictDto: UpdateDistrictDto): any;
    remove(id: number): any;
}
