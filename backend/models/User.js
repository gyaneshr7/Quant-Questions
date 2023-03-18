const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        name:{type:String},
        password:{type:String},
        email:{type:String},
        token:{type:String},
        phoneNo:{type:String},
        role:{type:String,enum: ['admin','user']},
        rank:{type:String,default:0},
        score:{type:Number,default:0},
        totalSubmissions:{type:Number,default:0},
        correctAns:{type:Number,default:0},
        correctAnswers:[{question:{type: mongoose.Schema.Types.ObjectId, ref: 'Question' }}],
        wrongAns:{type:Number,default:0},
        submittedQuestions:[
            {
                question:{type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
                correctAns:{type:Boolean},
                date:{type:String}
            }
        ],
        currentAttempted:[
            {
                questionId:{type:String},
                category:{type:String},
                status:{type:String}
            }
        ],
        badges:[
            { bronze:{type:Boolean,default:false} },
            { silver:{type:Boolean,default:false} },
            { gold:{type:Boolean,default:false} },
            { platinum:{type:Boolean,default:false} },
            { categorybadge:{type:Boolean,default:false} },
        ],
        weakCategories:[
            {
                category:{type:String},
                questionId:{type:String},
                count:{type:Number}
            }
        ]
    }
)

module.exports = mongoose.model('User',userSchema) ;