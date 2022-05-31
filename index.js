// REQURIED EXPORT INFORMATION
const express = require('express');
const routes = require('./routes')
const db = require('./config/connection');
const app = express();

// PORT TO BE USED FOR DATABASE INFORMATION
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
