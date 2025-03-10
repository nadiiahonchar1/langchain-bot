import express from 'express';
import { db } from '../../db/firebase.js';
import { getChatHistory } from '../../db/chatHistory.js';

const router = express.Router();

router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { message, role } = req.body;

    if (!message || !role) {
      return res.status(400).json({ error: 'Message and role are required' });
    }

    const historyRef = db.collection('users').doc(userId).collection('history');

    const newMessage = {
      message,
      role,
      timestamp: new Date().toISOString(),
    };

    await historyRef.add(newMessage);

    res.status(201).json({ message: 'Message saved', newMessage });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});


// router.get('/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const historyRef = db.collection('users').doc(userId).collection('history');
//     const snapshot = await historyRef.orderBy('timestamp').get();

//     if (snapshot.empty) {
//       return res.status(404).json({ error: 'No history found' });
//     }

//     const history = snapshot.docs.map((doc) => doc.data());

//     res.json(history);
//   } catch (error) {
//     console.error('Error fetching history:', error);
//     res.status(500).json({ error: 'Failed to fetch history' });
//   }
// });

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await getChatHistory(userId);
    res.json(history);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const historyRef = db.collection('users').doc(userId).collection('history');
    const snapshot = await historyRef.get();

    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));

    await batch.commit();

    res.json({ message: 'History cleared' });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

export default router;
