const connection = require('../config/connection');
const { User, thoughts } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing User
  await User.deleteMany({});

  // Drop existing thought
  await thoughts.deleteMany({});

  // Create empty array to hold the thoughts
  const thoughts = [];

  // Get some random assignment objects using a helper function that we imported from ./data
  const reactions = getRandomreactions(20);

  // Add thoughts to the collection and await the results
  await thoughts.collection.insertMany(thoughts);

  // Add courses to the collection and await the results
  await User.collection.insertOne({
    userName: 'hayden',
    inPerson: false,
    thoughts: [...thoughts],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.table(reactions);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
