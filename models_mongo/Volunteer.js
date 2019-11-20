const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const Schema = mongoose.Schema;

const VolunteerSchema = new Schema({
  mysqlId: {
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
  proficiency1: {
    proficiency1: " ",
    type: String,
    required: true,
    Default: false
  },
  proficiency2: {
    proficiency2: " ",
    type: String,
    required: true,
    Default: false
  },
  proficiency3: {
    proficiency3: " ",
    type: String,
    required: true,
    Default: false
  },
  appavail: {
    type: Boolean,
    required: true,
    Default: false
  },
  chatavail: {
    type: Boolean,
    required: true,
    Default: false
  },
  room: {
    type: Boolean,
    required: true,
    Default: false
  },
  socket: {
    type: Number,
    required: true,
    unique: true,
    Default: uuidv4(),
  }
})

const Volunteer = mongoose.model('Volunteer', VolunteerSchema);

module.exports = Volunteer;


