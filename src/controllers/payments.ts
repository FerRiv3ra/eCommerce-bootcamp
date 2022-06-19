import { Request, Response } from 'express';
import Stripe from 'stripe';
import { config } from '../config/envConfig';
import Producto from '../models/Producto';
import User from '../models/User';

const stripe = new Stripe(config.stripeSecretKey, {
  apiVersion: '2020-08-27',
});

const checkout = async (req: Request, res: Response) => {
  try {
    const products = await Producto.find();

    const storeItems = new Map(
      products.map((product) => {
        return [
          product.id,
          {
            name: `${product.brand} - ${product.name}`,
            priceInCents: product.price * 100,
            quantity: product.quantity,
          },
        ];
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map((item: any) => {
        const storeItem = storeItems.get(item.id);
        const producto = products.filter((product) => product.id === item.id);
        if (producto[0].stock >= item.quantity) {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: storeItem?.name,
              },
              unit_amount: storeItem?.priceInCents,
            },
            quantity: item.quantity,
          };
        } else {
          throw new Error(
            `The quantity in ${storeItem?.name} cannot be greater than the stock`
          );
        }
      }),
      success_url: `${config.frontUrl}/store/checkout/success/${req.uid}`,
      cancel_url: `${config.clientURL}/store/shoping-cart`,
    });
    res.json({ url: session.url });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }
};

const confirmPay = async (req: Request, res: Response) => {
  const id = req.params.id;
  const uid = req.uid;

  if (uid !== id) {
    return res.status(403).json({
      msg: 'You can confirm just your payment',
    });
  }

  try {
    const user = await User.findById(uid);

    const { purchased_items, shopping_cart } = user;

    user.shopping_cart = [];
    user.purchased_items = [...purchased_items, ...shopping_cart];

    user.save();

    res.json({
      msg: 'Payment confirm',
    });
  } catch (error) {
    console.log(error);
  }
};

export { checkout, confirmPay };
