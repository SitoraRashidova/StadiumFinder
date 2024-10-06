import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const CookiGetter=createParamDecorator(
    async (data:string,context:ExecutionContext):Promise<string>=>{
        const requset=context.switchToHttp().getRequest();
        const refreshToken=requset.cookie[data];
        if (!refreshToken){
            throw new UnauthorizedException('token is not found')
        }
        return refreshToken;
    }

    
)