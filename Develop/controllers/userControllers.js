const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // Get all courses
    async getUsers(req, res) {
      try {
        const users = await User.find()
        .populate('friends')
        .populate('thoughts')
        res.json(users);
      } catch (err) {
        console.error(err)
        res.status(500).json(err);
      }
    },
    // Get a course
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
        .populate('friends')
        .populate('thoughts')
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Create a course
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Delete a course
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'Thoughts and Users deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Update a course
    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
    async addFriend (req, res) {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            const { friendId } = req.body
            const friend = await User.findById(friendId);

            if(!user) {
                return res.status(404).json({ message: 'User not found' });

            } else if (!friend) {
                return res.status(404).json({ message: 'Friend not found' });
            }

            user.friends.push(friendId)
            await user.save()

            res.json(friendId)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteFriend(req, res) {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            const { friendId } = req.params;
            const friend = await User.findById(friendId);

            if(!user) {
                return res.status(404).json({ message: 'User not found' });

            } else if (!friend) {
                return res.status(404).json({ message: 'Friend not found' });
            }




            user.friends.pull(friendId);
            await user.save();
            console.log(user, friend)

            res.json(friendId)
        } catch (err) {
            console.error(err)
            res.status(500).json(err)
        }
    }
  };
  