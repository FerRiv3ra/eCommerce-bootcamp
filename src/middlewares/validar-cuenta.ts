import { Response, Request, NextFunction } from 'express';

export const isSameAccount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!req.authUser)
    return res.status(500).json({
      msg: 'Se esta validando la cuenta sin validar el JWT',
    });

  const {
    uid,
    authUser: { name },
  } = req;

  if (uid !== id)
    return res.status(401).json({
      msg: `${name} no tienes permisos para editar esta cuenta`,
    });

  next();
};
