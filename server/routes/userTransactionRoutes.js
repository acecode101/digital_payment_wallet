const express = require('express');
const jwt = require('jsonwebtoken');
const Transaction = require('../models/UserTransaction');
const router = express.Router();

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

router.post('/', authenticate, async (req, res) => {
  const { amount, type } = req.body;
  const tx = await Transaction.create({ userId: req.user.userId, amount, type });
  res.json(tx);
});

router.get('/history', authenticate, async (req, res) => {
  const txs = await Transaction.find({ userId: req.user.userId });
  res.json(txs);
});

module.exports = router;
