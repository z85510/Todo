import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private reflecor;
    handleRequest(err: any, user: any, info: any): any;
    constructor(reflecor: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export {};
