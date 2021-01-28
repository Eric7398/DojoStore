import express from 'express'
const router = express.Router();

router.get('/join', (req, res) => {
  res.send('server is up and running');
});

export default router;