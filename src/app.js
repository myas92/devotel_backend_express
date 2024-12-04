const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path');


const app = express();
app.use(morgan('tiny'));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);
app.use((req, res, next) => {
  const error = new Error('Could not find this route');
  error.status = 404;
  next(error);
});
app.use(errorHandler);

module.exports = app;
