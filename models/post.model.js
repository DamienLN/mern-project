const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    // id of the user who post
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commentterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: number,
        },
      ],
      require: true,
    },
  },
  {
    timestpamps: true,
  }
);

module.exports = mongoose.model('post', PostSchema)