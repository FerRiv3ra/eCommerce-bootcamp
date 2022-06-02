import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validarCampos = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Capturar errores si los hay
  const errors = validationResult(req);

  // Si hay errores mostrarlos
  if (!errors.isEmpty()) return res.status(400).json(errors);

  // Ejecuta el siguiente middleware
  next();
};
