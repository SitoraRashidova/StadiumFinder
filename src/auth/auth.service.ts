import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Admin } from '../admin/models/admin.model';
import { AdminSignInDto } from './dto/admin-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly adminService: AdminService
  ) {}

  async addAdmin(createAdminDto: CreateAdminDto) {
    const old_admin = await this.adminService.findByLogin(createAdminDto.login);
    if (old_admin) {
      throw new NotFoundException("Bunday admin mavjud");
    }

    const hashed_password = await bcrypt.hash(createAdminDto.hashed_password, 7);

    const admin = await this.adminService.create({
      ...createAdminDto,
      hashed_password: hashed_password,
    });
    const token = await this.adminGenerateToken(admin);
    admin.hashed_refresh_token = String(token);
    await admin.save();

    return {
      message: "Admin added successfully",
      data: admin,
    };
  }

  async adminGenerateToken(user: Admin) {
    const payload = {
      sub: user.id,
      is_creator: user.is_creator,
      
    
    };
    return this.JwtService.sign(payload);
  }

  async adminSigIn(adminSignInDto: AdminSignInDto) {
    const admin = await this.adminService.findByLogin(adminSignInDto.login);
    if (!admin) {
      throw new UnauthorizedException("Login or password incorrect");
    }

    const validPassword = await bcrypt.compare(
      adminSignInDto.password,
      admin.hashed_password
    );
    if (!validPassword) {
      throw new UnauthorizedException("Login or password incorrect");
    }
    return {
      message: "Admin signed in successfully",
      token: await this.adminGenerateToken(admin),
    };
  }
}
