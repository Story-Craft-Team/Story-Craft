import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { UserAuthService } from "src/modules/users/services/user-auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService: ConfigService,
                private readonly userAuthService:UserAuthService){
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID')!,
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET')!,
            callbackURL: configService.get('GOOGLE_CALLBACK_URL')!,
            scope: ["email", "profile"]
        })
    }

    async validate(accessToken: string, refreshToken:string, profile:any, done:VerifyCallback){
        return this.userAuthService.validateGoogleUser({
            email: profile.emails[0].value,
            displayName: profile.name.familyName ? profile.name.familyName : profile.name.givenName,
            username: profile.name.givenName,
            avatarUrl: profile.photos[0].value,
            password: ""
        })
    }
}