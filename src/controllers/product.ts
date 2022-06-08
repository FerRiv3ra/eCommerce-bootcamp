import { Request, Response } from 'express';
import Categoria from '../models/Categoria';
import Producto from '../models/Producto';

interface Sort {
  name?: string;
  price?: string;
  brand?: string;
}

interface Query {
  state: boolean;
  price?: any;
  category?: string;
}

const getProducts = async (req: Request, res: Response) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 0;
  const name = req.query.name;
  const price = req.query.price;
  const priceFrom = req.query.priceFrom;
  const priceTo = req.query.priceTo;
  const brand = req.query.brand;
  const category = req.query.category;

  const query: Query = { state: true };
  let sort: Sort = {};

  if (name) {
    if (name === 'asc' || name === 'desc') {
      sort.name = String(name);
    }
  }

  if (price) {
    if (price === 'asc' || price === 'desc') {
      sort.price = String(price);
    }
  }

  if (brand) {
    if (brand === 'asc' || brand === 'desc') {
      sort.brand = String(brand);
    }
  }

  if (category) {
    query.category = String(category);
  }

  if (priceFrom) {
    query.price = { ...query.price, $gte: Number(priceFrom) };
  }

  if (priceTo) {
    query.price = { ...query.price, $lte: Number(priceTo) };
  }

  console.log(query);

  const [total, products] = await Promise.all([
    Producto.countDocuments(query).skip(Number(start)),
    Producto.find(query)
      .populate({ path: 'user', select: 'name' })
      .populate({ path: 'category', select: 'name' })
      .sort(sort)
      .skip(Number(start))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

const createProduct = async (req: Request, res: Response) => {
  const user = req.uid;
  const name: string = req.body.name;
  const brand: string = req.body.brand;
  const price: number = req.body.price;
  const stock: number = req.body.stock;
  const category: string = req.body.category;
  const description: string = req.body.description || '';

  const product = new Producto({
    name: name.toUpperCase(),
    user,
    price,
    brand: brand.toUpperCase(),
    category,
    stock,
    description,
  });

  await product.save();

  res.status(201).json(product);
};

const editProduct = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const name: string = req.body.name;
  const brand: string = req.body.brand;
  const price: number = req.body.price;
  const stock: number = req.body.stock;
  const category: string = req.body.category;
  const description: string = req.body.description;

  const product = await Producto.findByIdAndUpdate(
    id,
    {
      name: name.toUpperCase(),
      price,
      category,
      stock,
      description,
      brand: brand.toUpperCase(),
    },
    { returnOriginal: false }
  );

  res.json(product);
};

const deleteProduct = async (req: Request, res: Response) => {
  const uid: string = req.params.id;

  const product = await Producto.findByIdAndUpdate(
    uid,
    { state: false },
    {
      returnOriginal: false,
    }
  );

  res.json(product);
};

export { getProducts, createProduct, editProduct, deleteProduct };
