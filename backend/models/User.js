const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        name:{type:String},
        password:{type:String},
        email:{type:String},
        token:{type:String},
        role:{type:String,enum: ['admin','user']},
        rank:{type:String}
    }
)

module.exports = mongoose.model('User',userSchema) ;