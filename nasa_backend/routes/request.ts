import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config()

const router = Router();

router.post('/', async function(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', `${process.env.REACT_APP_URL}`);
    res.header('Referrer-Policy','no-referrer-when-downgrade');

    const redirectURL = `${process.env.REACT_APP_URL}/oauth`;

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID, 
        process.env.CLIENT_SECRET,
        redirectURL
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type:'offline',
        scope:'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'
    });

    res.json({url:authorizeUrl})
})

export default router;
