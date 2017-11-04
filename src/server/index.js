import express from 'express';
import RaeClient from 'lib';

const PORT = process.env.PORT || 3000;
const app = express();
const Rae = RaeClient.create();

async function search(req, res) {
  res.send(await Rae.search(req.params.word));
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/:word', search);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
