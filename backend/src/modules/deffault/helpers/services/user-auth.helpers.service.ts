import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../../auth/services/auth.service";

@Injectable()
export class UserAuthHelperService {
    constructor(private prisma:PrismaService,
                private readonly jwtService: JwtService,
                private readonly authService: AuthService,
    ) {}
    async revokeToken(token: string){
        try{
            await this.prisma.revokedToken.create({
                data:{
                    token
                }
            })
            return { message: "User has been logged out"}
        }
        catch(error){
            throw error
        }
    }

    async isTokenRevoked(token: string): Promise<boolean> {
        try{
            const revokedToken = await this.prisma.revokedToken.findUnique({
                where: { token },
            });
            return revokedToken !== null;
        }
        catch(error){
            throw error
        }
    }

    async refreshAccessToken(refreshToken: string){
        try{
            const data = this.jwtService.decode(refreshToken)
            const accessToken = await this.authService.generateToken(data)
            return {
                tokens: {
                    accessToken: accessToken,
                    refreshToken,
                }
            }
        }
        catch(error){
            throw error
        }
    }
}