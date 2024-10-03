const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData  = require('./userData.json');
const thoughtData  = require('./thoughtData.json');
const reactionData  = require('./reactionData.json');



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

    await User.insertMany(userData);

    for (const thought of thoughtData) {
        const randomIndex = Math.floor(Math.random() * userData.length);
        const { username } = userData[randomIndex];
        // const selectedUser = await User.findOne({username});
        const currentThought = await Thought.create({...thought, username});

        await User.findOneAndUpdate({username}, {
            $push: { thoughts: currentThought._id },
        });
        
    
            const reactionIndex = Math.floor(Math.random() * reactionData.length);
            const currenctReaction = reactionData[reactionIndex];
    
             await Thought.findOneAndUpdate({...thought}, {
                $push: { reactions: currenctReaction._id }
            })
    
    };
    



  // Log out the seed data to indicate what should appear in the database
//   console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});