const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
const VolunteerSchema = new Schema({
  mysqlID: {
    type: String, 
    required: true,
    unique: true
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
,
  verified: {
  required: true,
    Default: false
  }
})
 
const Volunteer = mongoose.model('Volunteer', VolunteerSchema);
 
module.exports = Volunteer;
 

