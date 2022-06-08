type Config = {
  port: string;
  user: string;
  pass: string;
  host: string;
  dbName: string;
  jwtSecret: string;
  googleClientID: string;
  googleSectret: string;
  stripeSecretKey: string;
  clientURL: string;
  emailHost: string;
  emailPort: string;
  emailUser: string;
  emailPass: string;
  frontUrl: string;
};

export const config: Config = {
  port: process.env.PORT!,
  user: process.env.DB_USERNAME!,
  pass: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST!,
  dbName: process.env.DB_DBNAME!,
  jwtSecret: process.env.JWT_SECRET!,
  googleClientID: process.env.GOOGLE_CLIENT_ID!,
  googleSectret: process.env.GOOGLE_SECRET_ID!,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
  clientURL: process.env.CLIENT_URL!,
  emailHost: process.env.EMAIL_HOST!,
  emailPort: process.env.EMAIL_PORT!,
  emailUser: process.env.EMAIL_USER!,
  emailPass: process.env.EMAIL_PASS!,
  frontUrl: process.env.FRONT_URL!,
};
