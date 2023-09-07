const express = require('express');
const bodyParser = require('body-parser');
const { Model } = require('objection');
const knex = require('knex');
const Post = require('./models/post');
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());

const knexConfig = require('./knexfile');
const knexInstance = knex(knexConfig.development);

Model.knex(knexInstance);

app.get('/posts', async (req, res) => {
  const posts = await Post.query().withGraphFetched('user');
  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.query().findById(req.params.id).withGraphFetched('user');
  res.json(post);
});

app.post('/posts', async (req, res) => {
  try {
    const { title, body, user_id } = req.body;
    const post = await Post.query().insert({ title, body, user_id });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/posts/:id', async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = await Post.query().findById(req.params.id).patch({ title, body }).returning('*');
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.query().deleteById(req.params.id).returning('*');
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});