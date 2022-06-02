import 'dotenv/config';
import Server from './src/models/Server';

const server: Server = new Server();

server.listen();
