const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }
  // Create empty array to hold the students
  const users = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const username = getRandomUsername(20);

    // const username = getRandomUsername();
    // const first = fullName.split(' ')[0];
    // const last = fullName.split(' ')[1];
    const email = getRandomEmail();

    users.push({
     username,
     email,
    });
  }

  // Add students to the collection and await the results
  const userData = await User.create(users);

  // Add courses to the collection and await the results
//   await Thought.create({
//     courseName: 'UCLA',
//     inPerson: false,
//     students: [...studentData.map(({_id}) => _id)],
//   });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});