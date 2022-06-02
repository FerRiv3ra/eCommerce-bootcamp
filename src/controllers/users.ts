import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

const getUsers = async (req: Request, res: Response) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 0;

  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query).skip(Number(start)),
    User.find(query).skip(Number(start)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.json(user);
};

const createUser = async (req: Request, res: Response) => {
  // Crear la instancia del usuario con la información obligatoria
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();
  res.status(201).json(user);
};

const editUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto, {
    returnOriginal: false,
  }).select('-password');

  res.json({
    ok: true,
    user,
  });
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    id,
    { state: false },
    {
      returnOriginal: false,
    }
  );
  res.json({
    ok: true,
    user,
  });
};

export { getUsers, getUser, createUser, editUser, deleteUser };
