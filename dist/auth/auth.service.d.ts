import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Admin } from '../admin/models/admin.model';
import { AdminSignInDto } from './dto/admin-signin.dto';
export declare class AuthService {
    private readonly JwtService;
    private readonly adminService;
    constructor(JwtService: JwtService, adminService: AdminService);
    addAdmin(createAdminDto: CreateAdminDto): unknown;
    adminGenerateToken(user: Admin): unknown;
    adminSigIn(adminSignInDto: AdminSignInDto): unknown;
}
