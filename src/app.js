const express = require('express');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);
app.use((req, res, next) => {
    const error = new HttpError("could not found this route", 404);
    throw error;
  });
app.use(errorHandler);

module.exports = app;
