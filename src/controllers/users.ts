import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import generateToken from '../helpers/generateToken';
import { sendEmail } from '../helpers/send-email';

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

  const sent = await sendEmail(email, 'confirm', name, user.token);

  if (sent) {
    return res.status(201).json({
      msg: 'We have sent an email with the instructions to verify your account',
    });
  } else {
    return res.status(500).json({
      msg: 'email no enviado, hable con el administrador',
    });
  }
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

const confirmUser = async (req: Request, res: Response) => {
  const token: string = req.params.token;

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid token' });
    }

    user.confirm = true;
    user.token = '';

    await user.save();

    res.json({ msg: 'Success, user confirmed' });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  const email: string = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Email no registered' });
    }

    const token = generateToken();
    user.token = token;
    await user.save();

    const sent = await sendEmail(
      email,
      'forgot-password',
      user.name,
      token,
      false
    );

    if (sent) {
      return res.json({ msg: 'We have sent an email with the instructions' });
    } else {
      return res.status(500).json({
        msg: 'email no enviado, hable con el administrador',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const confirmToken = async (req: Request, res: Response) => {
  const token: string = req.params.token;

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid token' });
    }

    res.json({ msg: 'Success, valid token' });
  } catch (error) {
    console.log(error);
  }
};

const newPassword = async (req: Request, res: Response) => {
  const password: string = req.body.password;
  const token: string = req.params.token;

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid token' });
    }

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    user.token = '';

    await user.save();

    res.json({ msg: 'Success, password changed' });
  } catch (error) {
    console.log(error);
  }
};

export {
  getUsers,
  getUser,
  createUser,
  editUser,
  deleteUser,
  confirmUser,
  forgotPassword,
  confirmToken,
  newPassword,
};
