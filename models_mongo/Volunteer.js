const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const Schema = mongoose.Schema;

const VolunteerSchema = new Schema({
  mysqlID: {
    type: Number,
    required: true,
    unique: true
  },
  language1: {
    language1: " ",
    type: String,
    required: true,
    Default: false
  },
  language2: {
    language2: " ",
    type: String,
    required: true,
    Default: false
  },
  language3: {
    language2: " ",
    type: String,
    required: false,
  },
  proficiency1: {
    proficiency1: " ",
    type: String,
    required: true,
  },
  proficiency2: {
    proficiency2: " ",
    type: String,
    required: true,
  },
  proficiency3: {
    proficiency3: " ",
    type: String,
    required: false,
  },
  appavail: {
    type: Boolean,
    Default: false
  },
  chatavail: {
    type: Boolean,
    Default: false
  },
  room: {
    type: Boolean,
    Default: false
  },
  socket: {
    type: Number,
    unique: true,
    Default: uuidv4(),
  }
})

const Volunteer = mongoose.model('Volunteer', VolunteerSchema);

module.exports = Volunteer;


