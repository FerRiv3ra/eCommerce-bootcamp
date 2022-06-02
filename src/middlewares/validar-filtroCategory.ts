import { Request, Response, NextFunction } from 'express';
import Categoria from '../models/Categoria';

const validFilterCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const category = req.query.category;

  if (category) {
    try {
      const existsCategory = await Categoria.findById(category);

      if (!existsCategory) {
        req.query.category = undefined;
      }

      next();
    } catch (error) {
      next();
    }
  } else {
    next();
  }
};

export default validFilterCategory;
