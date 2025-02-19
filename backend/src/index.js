import express from 'express';
import cors from 'cors';
import router from './routes/bot.js';


const app = express();


app.use(cors());
app.use(express.json());

app.use('/chat', router);

app.listen(3001, () => console.log('Server running'));
