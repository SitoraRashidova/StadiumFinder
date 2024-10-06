import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { AdminSignInDto } from "./dto/admin-signin.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    addAdmin(createAdminDto: CreateAdminDto): unknown;
    adminSigIn(adminSignInDto: AdminSignInDto): unknown;
}
