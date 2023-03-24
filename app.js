import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';

import './lib/dotenv.js';
import { auth }  from './lib/auth.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/private', auth, express.static(path.join(__dirname, 'private')));

import routes from './router/index.js';

app.use("/", routes);

app.listen(process.env.PORT || 4000, () => { console.log("App running at http://localhost:4000/ on port 4000") });