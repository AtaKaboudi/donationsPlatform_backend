const mongoose = require ('mongoose')
const charitySchema = mongoose.Schema ({
  _id : mongoose.Schema.Types.ObjectId,
  name:String,
  location : String,
  initiatives  : [String],
  donations : [String],
  rating:Number,
  contact:[String],
  representative:String,
  slogan:String,
  numberOfRatings: Number,
  username:String,
  password:String,
  logo: String,
 
})

module.exports = mongoose.model('Charity',charitySchema);



      
      