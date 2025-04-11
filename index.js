import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const public_path = join(__dirname, 'public');
app.use(express.static(public_path));

app.listen(9000, () => {
  console.log('Server started on port 9000.\nCtrl^C to quit.');
});
