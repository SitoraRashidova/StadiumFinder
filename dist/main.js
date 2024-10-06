"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
async function start() {
    try {
        const PORT = process.env.PORT || 3030;
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.use(cookieParser());
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.setGlobalPrefix("/api");
        const config = new swagger_1.DocumentBuilder()
            .setTitle("StadiumFinder project")
            .setDescription("StadiumFinder project ReS API")
            .setVersion("1.0")
            .addTag("NestJs,validation,swagger,guard,sequelise,pg,mailer,bot,sms,cookei")
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup("api/docs", app, document);
        await app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
start();
//# sourceMappingURL=main.js.map