import passport from "passport";
import { Strategy } from "passport-discord";
import dotenv from 'dotenv';

dotenv.config();
export default passport.use(
    new Strategy(
        {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT,
        scope: ["identify", "email"],
        }, 
        (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    })
)