const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
  native: {
    type: String,
    required: true,
    unique: true
  },
  language: {
    type: String,
    required: true
  }, 
  room: {
    type: String,
    required: true,
   Default: null
  }
})
 
const User = mongoose.model('User', UserSchema);
 
module.exports = User;
 

