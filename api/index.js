const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// 统一数据存储
let store = {
  events: [],
  feedback: [],
  faqs: []
};

// 埋点接口
app.post('/api/events', (req, res) => {
  req.body.timestamp = new Date().toISOString();
  store.events.push(req.body);
  res.json({ success: true });
});
app.get('/api/events', (req, res) => res.json(store.events));

// 反馈接口
app.post('/api/feedback', (req, res) => {
  req.body.timestamp = new Date().toISOString();
  store.feedback.push(req.body);
  res.json({ success: true });
});
app.get('/api/feedback', (req, res) => res.json(store.feedback));

// ✅ 修复：FAQ标准接口（增删查，和前端完全匹配）
app.get('/api/faqs', (req, res) => res.json(store.faqs));
app.post('/api/faqs', (req, res) => { store.faqs.push(req.body); res.json({ success: true }); });
app.delete('/api/faqs/:id', (req, res) => {
  store.faqs = store.faqs.filter(f => f.id != req.params.id);
  res.json({ success: true });
});

module.exports = app;
