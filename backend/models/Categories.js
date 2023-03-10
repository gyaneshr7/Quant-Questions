const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema(
    {
        category:[{
            name:{type:String},
            count:{type:Number,default:0},
            color:{type:String}
        }],
        answerType:[{
            name:{type:String},
            count:{type:Number,default:0}
        }],
        firms:[{
            name:{type:String},
            count:{type:Number,default:0}
        }],
        divisions:[{
            name:{type:String},
            count:{type:Number,default:0}
        }],
        positions:[{
            name:{type:String},
            count:{type:Number,default:0}
        }],
        tags:[{
            name:{type:String},
            count:{type:Number,default:0}
        }],
    }
)

module.exports = mongoose.model('Category',categoriesSchema) ;