import { Request, Response, NextFunction } from 'express';

export const isAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.authUser)
    return res.status(500).json({
      msg: 'Se esta validando el rol sin validar el JWT',
    });

  const { role, name } = req.authUser;

  if (role !== 'ADMIN_ROLE')
    return res.status(401).json({
      msg: `${name} no es administrador`,
    });

  next();
};

export const hasRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.authUser)
      return res.status(500).json({
        msg: 'Se esta validando el rol sin validar el JWT',
      });

    if (!roles.includes(req.authUser.role))
      return res.status(401).json({
        msg: `Para esta acción se requiere uno de los siguientes roles ${roles}`,
      });
    next();
  };
};
