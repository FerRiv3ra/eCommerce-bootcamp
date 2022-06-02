import { Request, Response } from 'express';
import Stripe from 'stripe';
import { config } from '../config/envConfig';
import Producto from '../models/Producto';

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
      }),
      success_url: `${config.clientURL}/success.html`,
      cancel_url: `${config.clientURL}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { checkout };
