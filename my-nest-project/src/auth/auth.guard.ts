import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) throw new UnauthorizedException('No token provided');
        try{
            const payload = await this.jwtService.verifyAsync(token, {secret: 'vorona-gey'});
            request.user = payload;
        } catch{
            throw new UnauthorizedException('No token provided');
        }
        return true;
    }
}
