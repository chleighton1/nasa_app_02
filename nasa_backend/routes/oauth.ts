import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { OAuth2Client, Credentials } from 'google-auth-library';

dotenv.config();

const router = Router();


async function getUserData(access_token: string) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`
  );
  const data = await response.json();
  console.log("data", data);
}

router.get("/", async (req: Request<{}, {}, {}, { code?: string }>, res: Response) => {
  const code = req.query.code;
  try {
    if (!code) {
      return res.status(400).json({ error: 'Missing code parameter' });
    }

    const redirectURL = `${process.env.REACT_APP_URL}/oauth`;
    const oAuth2Client = new OAuth2Client({
      clientId: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || '',
      redirectUri: redirectURL,
    });

    const response = await oAuth2Client.getToken(code);
    const tokens = response.tokens as Credentials;
    await oAuth2Client.setCredentials(tokens);
    console.log("Tokens acquired");
    const user = oAuth2Client.credentials;
    console.log("credentials", user);
    await getUserData(user.access_token as string);
  } catch (err) {
    console.log("Error with signing in with Google");
  }
});

export default router;

