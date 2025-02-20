import express from 'express';
import cors from 'cors';
import router from './routes/bot.js';


const app = express();


app.use(cors());
app.use(express.json());

app.use('/chat', router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

app.listen(3001, () => console.log('Server running'));
