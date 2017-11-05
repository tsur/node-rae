import express from 'express';
import RaeClient from 'lib';

const app = express();
const Rae = RaeClient.create();

async function search(req, res) {
  try {
    res.send(await Rae.search(req.params.word));
  } catch (e) {
    res.status(404).send('Not found');
  }
}

async function fetch(req, res) {
  try {
    res.send(await Rae.fetch(req.params.id));
  } catch (e) {
    res.status(404).send('Not found');
  }
}

app.use((req, res, next) => {
  const origin = req.get('origin') || '';
  if (origin.includes('localhost')) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
  if (CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
  next();
});

app.get('/search/:word', search);
app.get('/fetch/:id', fetch);

if (!PROD) {
  app.set('port', 3000);
  app.listen(app.get('port'), () =>
    console.log(`Example app listening on port ${app.get('port')}!`));
}

export default app;
