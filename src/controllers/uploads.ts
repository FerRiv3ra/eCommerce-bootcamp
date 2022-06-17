import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/envConfig';
import { validFileExt } from '../helpers/uploadFile';
import { Request, Response } from 'express';
import User from '../models/User';
import Producto from '../models/Producto';

cloudinary.config(config.cloudinaryUrl);

export const updateImg = async (req: Request, res: Response) => {
  const { id, collection } = req.params;

  try {
    await validFileExt(req.files);

    let model;
    switch (collection) {
      case 'users':
        model = await User.findById(id);
        if (!model) {
          return res
            .status(400)
            .json({ msg: `Event with ID ${id} not exists` });
        }
        break;
      case 'products':
        model = await Producto.findById(id);
        if (!model) {
          return res
            .status(400)
            .json({ msg: `Event with ID ${id} not exists` });
        }
        break;

      default:
        return res.status(500).json({ msg: 'Cellection no added' });
    }

    // Clean img
    if (model.img) {
      const nameArr = model.img.split('/');
      const name = nameArr[nameArr.length - 1];
      const [public_id] = name.split('.');

      cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;

    model.save();

    res.json(model);
  } catch (msg) {
    return res.status(400).json({ msg });
  }
};
