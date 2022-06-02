import mongoose from 'mongoose';
import { config } from './envConfig';

const { user, pass, host, dbName } = config;

export const connection = async () => {
  await mongoose.connect(`mongodb+srv://${user}:${pass}@${host}/${dbName}`);
  console.log('DB Online');
};
