import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { router } from './routers/router.js';
import { runDBConnection } from './dbConnection.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

app.listen(3000, () => {
    console.log('Express server started on port 3000');
    runDBConnection();
});