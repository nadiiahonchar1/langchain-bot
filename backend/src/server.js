import express from 'express';
import cors from 'cors';
import chatRouter from './routes/api/chat.js';
import userRouter from './routes/api/users.js';

const app = express();
const corsOptions = {
  origin: 'https://tangerine-rolypoly-88014e.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/chat', chatRouter);

app.use((err, _, res, __) => {
  console.error(err);
  res
    .status(500)
    .json({ error: 'Internal Server Error', details: err.message });
});

app.listen(3001, () => console.log('Server running'));
