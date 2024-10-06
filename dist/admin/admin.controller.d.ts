import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): any;
    findAll(): any;
    findByLogin(login: string): unknown;
    findOne(id: string): any;
    update(id: string, updateAdminDto: UpdateAdminDto): any;
    remove(id: string): any;
}
