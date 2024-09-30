const dayjs = require('dayjs');
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createAt: {
      type: Date,
      default: dayjs().toDate()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);


thoughtSchema.virtual('formattedCreatedAt').get(() => {
    return dayjs(this.createAt).format('YYYY-MM-DD HH:mm:ss');
});

thoughtSchema.virtual('reacitonCount').get(() => {
    return this.reactions.length
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;