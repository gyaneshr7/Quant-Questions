const mongoose = require('mongoose');


const resourceSchema = mongoose.Schema({
    name:{type:String},
    pdf:{type:String},
    cloudinary_id:{type:String}
})

module.exports = mongoose.model('Resource',resourceSchema) ;