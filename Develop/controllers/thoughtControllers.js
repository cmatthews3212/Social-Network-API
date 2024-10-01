const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            // .populate('users');
            res.json(thoughts)
        } catch (err) {
            console.error(err)
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            // .populate('users');

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that Id' });
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });

        }

        const user = await User.findOneAndUpdate(
            { thoughts: req.params.userId },
            { $pull: { thoughts: req.params.userId } },
            { new: true }
        );

        if(!user) {
            return res.status(404).json({
                message: 'Thought deleted, but no users found'
            });
        }

        res.json({ message: 'thought successfully deleted '});

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'no thought with that Id'});
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteReaction (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'no thought with that id'});

            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
};