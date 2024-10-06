"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserCardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserCardDto {
}
exports.CreateUserCardDto = CreateUserCardDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "BBR",
        description: "Card name",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserCardDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "+998901234567",
        description: "Uz phone number",
    }),
    (0, class_validator_1.IsPhoneNumber)("UZ"),
    __metadata("design:type", String)
], CreateUserCardDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "9860........8941",
        description: "Card number",
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], CreateUserCardDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "26",
        description: "Card year",
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], CreateUserCardDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "11",
        description: "Card month",
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], CreateUserCardDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "",
        description: "",
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserCardDto.prototype, "is_main", void 0);
//# sourceMappingURL=create-user_card.dto.js.map