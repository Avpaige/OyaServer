const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  languages: [
    {language: french, 
    type: Boolean,
    required: true,
    Default: false
  },
  {language: spanish, 
      type: Boolean,
    required: true,
    Default: false
  },
  {language: english, 
    type: Boolean,
    required: true,
    Default: false
 },
 {language: chinese, 
    type: Boolean,
    required: true,
   Default: false
  }],
  avail: {
    type: String,
    required: true,
   Default: inactive
  }
})
 
const User = mongoose.model('User', UserSchema);
 
module.exports = User;
 

