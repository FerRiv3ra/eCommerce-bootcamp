import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/envConfig';
import User from '../models/User';

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const jwtPayload: JwtPayload | string = jwt.verify(
        token,
        config.jwtSecret
      );
      let uid;
      if (typeof jwtPayload !== 'string') {
        uid = jwtPayload.uid;
      }

      const user = await User.findById(uid).select('-password');

      if (!user) {
        return res.status(401).json({
          msg: 'Invalid token',
        });
      }

      req.authUser = user;
      req.uid = uid;

      next();
    } catch (error) {
      return res.status(401).json({
        msg: 'Invalid token',
      });
    }
  } else {
    return res.status(400).json({
      msg: 'There is no token in the request',
    });
  }
};
