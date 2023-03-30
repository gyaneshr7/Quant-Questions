const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const questionsSchema = mongoose.Schema(
    {
        uniqueId:{type:Number},
        title:{type:String},
        question:{type:String},
        answer:{type:String},
        difficulty:{type:String},
        date:{type:String},
        submission:{type:Number,default:0},
        accepted:{type:Number,default:0},
        answerType:{type:String},
        options:[{type:String}],
        category:{type:String},
        firms:[{type:String}],
        divisions:[{type:String}],
        position:[{type:String}],
        tags:[{type:String}],
        explanation:{type:String}
    }
)

module.exports = mongoose.model('Question',questionsSchema) ;