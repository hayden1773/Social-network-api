const { connect, connection } = require('mongoose');

// MONGOOSE CONNECTION TO DATABASE
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/thoughtsDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
