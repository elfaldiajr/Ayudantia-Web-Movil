import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


export const Roles = (...roles: string[]) => SetMetadata('roles', roles);



@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector : Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler())
        if(!requiredRoles) return true

        const { user } = context.switchToHttp().getRequest()

        if(!user) throw new ForbiddenException('User not found in request')
        
        if(!requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Forbidden content')
        }

        return true        
    }
}