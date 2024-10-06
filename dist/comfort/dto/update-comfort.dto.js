"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComfortDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_comfort_dto_1 = require("./create-comfort.dto");
class UpdateComfortDto extends (0, mapped_types_1.PartialType)(create_comfort_dto_1.CreateComfortDto) {
}
exports.UpdateComfortDto = UpdateComfortDto;
//# sourceMappingURL=update-comfort.dto.js.map