const router = require('express').Router();
const mongoose = require('mongoose')
const User = require('../models/User');
const Questions = require('../models/Questions');

// get all users
router.get('/', async (req, res) => {
    try {
        const data = await User.aggregate([{ $match: {} }, { $project: { phoneNo: 1 } }]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get user by id
router.get('/:id', async (req, res) => {
    try {
        const data = await User.aggregate([{ $match: { _id: mongoose.Types.ObjectId(req.params.id) } }]);
        console.log();
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Fetch attempted questions of a user
router.get('/get/all/attempted/question/:id', async (req, res) => {
    try {
        const questions = await User.find({ _id: req.params.id }).populate('submittedQuestions.question');
        res.status(500).json(questions[0]);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/get/scores', async (req, res) => {
    try {
        const user = await User.aggregate([{ $match: { role: "user" } }, { $project: { score: 1 } }]);
        console.log(user);
        res.status(500).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

// update unique correct answers of a user
// router.put('/correct/answers/:id', async (req, res) => {
//     try {
//         const data = await User.findOneAndUpdate({ _id: req.params.id }, {
//             $push: { correctAnswers: req.body },
//         }, { new: true }).populate('submittedQuestions');
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

// delete array elements of correct Answers
router.put('/delete/correct/answers/:id', async (req, res) => {
    try {
        const result = await User.updateMany({ _id: req.params.id }, { "$pull": { "correctAnswers": {} } })
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error);
    }
})

// update user on submission of answer
router.put('/submittedans/:id', async (req, res) => {
    try {
        console.log(req.body);
        const data = await User.findOneAndUpdate({ _id: req.params.id }, {
            totalSubmissions: req.body.totalSubmissions,
            correctAns: req.body.correctAns,
            score: req.body.score,
            wrongAns: req.body.wrongAns,
            $push: { submittedQuestions: req.body.submittedQuestions },
        }, { new: true }).populate('submittedQuestions');
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
})

// update curent question status of a user
router.put('/update/ans/status/:id/:quesId', async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.params.id, 'currentAttempted.questionId': req.params.quesId });
        if (data) {
            const userdata = await User.findOneAndUpdate({ _id: req.params.id, "currentAttempted.questionId": req.params.quesId.toString() }, {
                $set: {
                    "currentAttempted.$.status": req.body.status,
                }
            }, { new: true })
            res.status(200).json(userdata)
        } else {
            const data = await User.findOneAndUpdate({ _id: req.params.id }, {
                $push: { currentAttempted: req.body }
            }, { new: true });
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// update badge status
router.put('/update/badge/status/:id', async (req, res) => {
    console.log(req.body);
    try {
        const data = await User.findOne({ _id: req.params.id, 'badges.name': req.body.badgeval.name });
        if(data){
            const userdata = await User.findOneAndUpdate({ _id: req.params.id, "badges.name": req.body.badgeval.name }, {
                $set: {
                    "badges.$.status": req.body.badgeval.status,
                },highestCount: req.body.count && req.body.count
            }, { new: true })
            res.status(200).json(userdata)
        }else{
            console.log("hii");
            const userdata = await User.findOneAndUpdate({ _id: req.params.id}, {
                $push: { badges: req.body.badgeval },highestCount: req.body.count && req.body.count
            }, { new: true });
            res.status(200).json(userdata);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})


// update weakness of user
// router.put('/update/weak/categories/:id', async (req, res) => {
//     console.log(req.body, "mdkh3dihuh")
//     try {
//         const data = await User.findOne({ _id: req.params.id, 'weakCategories.category': req.body.category });
//         if (data) {
//             const userdata = await User.updateOne({ _id: req.params.id, "weakCategories.category": req.body.category }, {
//                 $set: {
//                     "weakCategories.$.count": req.body.count,
//                 }
//             }, { new: true })
//             res.status(200).json(userdata)
//         } else {
//             const data = await User.updateOne({ _id: req.params.id }, {
//                 $push: { weakCategories: req.body }
//             });
//             res.status(200).json(data);
//         }
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })



module.exports = router;