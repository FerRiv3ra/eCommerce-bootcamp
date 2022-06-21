# ElectroStore - Backend

## First steps

To use this backend, you need to run before all

> npm install

Rename example.env to .env and fill some enviroment variables

> PORT= Assign a port number, for example 4000

Create an account in [Mongo Atlas](https://account.mongodb.com/account/login), and create a cluster to fill this part

> **DB_USERNAME**= Use your username
> **DB_PASSWORD**= Use your Password
> **DB_HOST**= Use your host name
> **DB_DBNAME**= Assign a database name, for example "_ElectroBackend_"

Use your credentials or for test you can create an account in [Mailtrap](https://mailtrap.io/) and fill this part

> **EMAIL_HOST**= Use your host name
> **EMAIL_PORT**= Use your port number
> **EMAIL_USER**= Use your email user
> **EMAIL_PASS**= Use your email pass

To fill this part you need an account in [Stripe](https://stripe.com/)

> **STRIPE_SECRET_KEY**= Use your Stripe secret
> **CLIENT_URL**= This is an url to redirect, for example "_localhost:4000_"

This part is to Google SingIn, you need to go to [Google Console](https://console.cloud.google.com/apis/) and create a new project

> **GOOGLE_CLIENT_ID**= Use your Google client secret
> **GOOGLE_SECRET_ID**= Use your Google secret id

Create a secret word to sign JWT, you can go to [LastPass](https://www.lastpass.com/es/features/password-generator) and generate.

> **JWT_SECRET**= Paste your word or create your own

Create an account in [Cludinary](https://cloudinary.com/users/login) to upload images

> **CLOUDINARY_URL**= Use your Cludinary URL

Fill with your front url

> **FRONT_URL**= Use your frontend url, for example "_localhost:3000_"

### Execute developer server

> npm start

### Create production build

> npm run build

## Docs in Postman

> Open [Docs](https://documenter.getpostman.com/view/11178258/UzBnqS74)
