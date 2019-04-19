import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import env from './env';

const LIFE = 7200;
let expiration: number = null;
let accessToken: string = null;
export default async () => {
  const halfLife = (Date.now() / 1000) + LIFE / 2;
  if (
    expiration !== null &&
    expiration > halfLife &&
    accessToken !== null
  ) {
    return accessToken;
  }
  const payloadExpiration = (Date.now() / 1000) + LIFE;
  const payload = {
    aud: `${env.EINSTEIN_VISION_URL}v2/oauth2/token`,
    exp: payloadExpiration,
    sub: env.EINSTEIN_VISION_ACCOUNT_ID,
  };
  const token = jwt.sign(
    payload,
    env.EINSTEIN_VISION_PRIVATE_KEY,
    { algorithm: 'RS256'},
  );
  const response = await fetch(`${env.EINSTEIN_VISION_URL}v2/oauth2/token`, {
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const { access_token } = await response.json();
  accessToken = access_token;
  expiration = payloadExpiration;
  return accessToken;
};
