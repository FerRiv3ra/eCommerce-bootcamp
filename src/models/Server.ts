import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookie from 'cookie-parser';
import { connection } from '../config/dbConfig';
import { config } from '../config/envConfig';
import {
  userRoute,
  authRoute,
  categoryRoute,
  productRoute,
  checkoutRoute,
} from '../routes';

class Server {
  app: express.Application;
  paths: {
    auth: string;
    users: string;
    categories: string;
    products: string;
    checkout: string;
  };
  constructor() {
    this.app = express();

    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories',
      products: '/api/products',
      checkout: '/api/checkout',
    };

    this.dbConnection();

    this.middlewares();

    this.routes();
  }

  private async dbConnection() {
    await connection();
  }

  private middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static('./src/public'));

    this.app.use(morgan('dev'));

    this.app.use(cookie());
  }

  private routes() {
    this.app.use(this.paths.auth, authRoute);
    this.app.use(this.paths.users, userRoute);
    this.app.use(this.paths.categories, categoryRoute);
    this.app.use(this.paths.products, productRoute);
    this.app.use(this.paths.checkout, checkoutRoute);
  }

  public listen() {
    this.app.listen(config.port, () => {
      console.log('App corriendo en el puerto ' + config.port);
    });
  }
}

export default Server;
