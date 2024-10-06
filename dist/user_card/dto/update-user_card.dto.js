"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserCardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_card_dto_1 = require("./create-user_card.dto");
class UpdateUserCardDto extends (0, swagger_1.PartialType)(create_user_card_dto_1.CreateUserCardDto) {
}
exports.UpdateUserCardDto = UpdateUserCardDto;
//# sourceMappingURL=update-user_card.dto.js.map