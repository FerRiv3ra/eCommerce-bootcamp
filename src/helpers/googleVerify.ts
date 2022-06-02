import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { config } from '../config/envConfig';

const { googleClientID } = config;

const client = new OAuth2Client(googleClientID);

export const googleVerify = async (idToken: string) => {
  const ticket: LoginTicket = await client.verifyIdToken({
    idToken,
    audience: googleClientID,
  });
  if (ticket.getPayload()) {
    const name: string | undefined = ticket.getPayload()?.name;
    const img: string | undefined = ticket.getPayload()?.picture;
    const email: string | undefined = ticket.getPayload()?.email;
    return {
      name,
      img,
      email,
    };
  }
};
