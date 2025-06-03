import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UserAuthHelperService {
    constructor(private prisma:PrismaService) {}
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
}