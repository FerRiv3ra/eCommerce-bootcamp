import { CookieOptions } from 'express';

let expires: Date = new Date();
expires.setDate(expires.getDate() + 7);

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'none',
  expires,
};
