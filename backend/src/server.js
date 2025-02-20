import express from 'express';
import cors from 'cors';
import chatRouter from './routes/api/chat.js';
import userRouter from './routes/api/users.js';


const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/chat', chatRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ error: 'Internal Server Error', details: err.message });
});

app.listen(3001, () => console.log('Server running'));
