import { Request, Response } from 'express';
import Categoria from '../models/Categoria';

const getCategories = async (req: Request, res: Response) => {
  let { start = 0, limit = 0 } = req.query;

  const query = { state: true };

  const categories = await Categoria.find(query)
    .populate({ path: 'user', select: 'name' })
    .skip(Number(start))
    .limit(Number(limit));

  res.json({
    categories,
  });
};

const createCategory = async (req: Request, res: Response) => {
  const user = req.uid;
  const name: string = req.body.name;

  const category = new Categoria({ name: name.toUpperCase(), user });

  await category.save();

  res.status(201).json(category);
};

const editCategory = async (req: Request, res: Response) => {
  const uid: string = req.params.id;
  const name: string = req.body.name;

  const category = await Categoria.findByIdAndUpdate(
    uid,
    { name: name.toUpperCase() },
    {
      returnOriginal: false,
    }
  );

  res.json(category);
};

const deleteCategory = async (req: Request, res: Response) => {
  const uid: string = req.params.id;

  const category = await Categoria.findByIdAndUpdate(
    uid,
    { state: false },
    {
      returnOriginal: false,
    }
  );

  res.json(category);
};

export { getCategories, createCategory, editCategory, deleteCategory };
