import jwt from 'jsonwebtoken';
import { config } from '../config/envConfig';

export const generarJWT = (uid: string) => {
  return new Promise((res, rej) => {
    const payload = { uid };

    jwt.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: '7d',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          rej('No se pudo generar el token');
        }

        res(token);
      }
    );
  });
};
