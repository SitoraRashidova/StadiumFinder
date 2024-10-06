import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatorGuard } from "../guards/creator.guard";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { AdminSignInDto } from "./dto/admin-signin.dto";
import { AuthService } from "./auth.service";

@ApiTags("AUTH")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: "Yangi admin royhatdan o`tkazish" })
  @ApiResponse({
    status: 201,
    description: "Ro`yxatdan o`tgan admin",
    type: String,
  })
  @UseGuards(CreatorGuard)
  @UseGuards(JwtAuthGuard)
  @Post("add-admin")
  async addAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.addAdmin(createAdminDto);
  }
  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  // @HttpCode(200)
  @Post("signin")
  @HttpCode(HttpStatus.OK)
  async adminSigIn(@Body() adminSignInDto: AdminSignInDto) {
    return this.authService.adminSigIn(adminSignInDto);
  }
}
