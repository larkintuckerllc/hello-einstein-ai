import express from 'express';
import env from './apis/env';
import model from './apis/model';

const PORT = env.PORT;
const start = async () => {
  try {
    const app = express();
    app.get('/', async (req, res) => {
      try {
        const { phrase } = req.query;
        if (phrase === undefined || phrase.trim() === '') {
          res.status(400).send();
          return;
        }
        const results = await model(phrase);
        res.send(results);
      } catch (error) {
        console.log(error);
        res.status(500).send();
      }
    });
    app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
  } catch (error) {
    console.log(error);
  }
};
start();
