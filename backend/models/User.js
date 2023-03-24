const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        name: { type: String },
        password: { type: String },
        email: { type: String },
        token: { type: String },
        phoneNo: { type: String },
        role: { type: String, enum: ['admin', 'user'] },
        rank: { type: String, default: 0 },
        score: { type: Number, default: 0 },
        totalSubmissions: { type: Number, default: 0 },
        correctAns: { type: Number, default: 0 },
        correctAnswers: [{ question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' } }],
        wrongAns: { type: Number, default: 0 },
        submittedQuestions: [
            {
                question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
                correctAns: { type: Boolean },
                date: { type: String }
            }
        ],
        currentAttempted: [
            {
                questionId: { type: String },
                category: { type: String },
                status: { type: String }
            }
        ],
        badges: [
            { bronze: { type: Boolean, default: false } },
            { sone: { type: Boolean, default: false } },
            { stwo: { type: Boolean, default: false } },
            { sthree: { type: Boolean, default: false } },
            { sfourth: { type: Boolean, default: false } },
            { sfifth: { type: Boolean, default: false } },
            { gone: { type: Boolean, default: false } },
            { gtwo: { type: Boolean, default: false } },
            { gthree: { type: Boolean, default: false } },
            { gfourth: { type: Boolean, default: false } },
            { gfifth: { type: Boolean, default: false } },
            { pone: { type: Boolean, default: false } },
            { ptwo: { type: Boolean, default: false } },
            { pthree: { type: Boolean, default: false } },
            { pfourth: { type: Boolean, default: false } },
            { pfifth: { type: Boolean, default: false } },
        ]
    }
)

module.exports = mongoose.model('User', userSchema);