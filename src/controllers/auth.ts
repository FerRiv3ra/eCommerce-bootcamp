import bcryptjs from 'bcrypt';

import { Request, Response } from 'express';
import { generarJWT } from '../helpers/generateJWT';
import { googleVerify } from '../helpers/googleVerify';
import User from '../models/User';
import { cookieConfig } from '../helpers/cookieConfig';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el correo existe
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: 'Usuario o contraseña incorrecto' });

    // Verificar si esta activo
    if (!user.state) return res.json({ msg: 'El usuario no esta activo' });

    // Verificar contraseña
    const validPass = bcryptjs.compareSync(password, user.password);
    if (!validPass)
      return res.status(400).json({ msg: 'Usuario o contraseña incorrecto' });

    // Generar JWT
    const token = await generarJWT(user._id);

    res.status(201).cookie('token', token, cookieConfig).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Algo salió mal, hable con el administrador',
    });
  }
};

export const googleSignIn = async (req: Request, res: Response) => {
  const { id_token }: { id_token: string } = req.body;

  let name, img, email;
  try {
    const gVerify = await googleVerify(id_token);
    if (gVerify) {
      name = gVerify.name;
      email = gVerify.email;
      img = gVerify.img;
    }

    let user = await User.findOne({ email });

    // Verificar si el usuario existe en DB sino crearlo
    if (!user) {
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    // Verificar el estado del usuario de Google
    if (!user.state) {
      return res.status(401).json({
        msg: 'Usuario bloqueado - Hable con el administrador',
      });
    }

    // Generar JWT
    const token = await generarJWT(user._id);

    res.cookie('token', token, cookieConfig).json(user);
  } catch (err) {
    res.status(400).json({
      msg: 'Token de Google no válido',
    });
  }
};

export const tokenLogin = async (req: Request, res: Response) => {
  const uid = req.uid;

  const user = await User.findById(uid);

  res.json(user);
};
