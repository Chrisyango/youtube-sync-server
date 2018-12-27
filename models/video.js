'use strict';

const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  videoID: {
    type: String,
    required: true,
    unique: true
  },
});

VideoSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  } 
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;