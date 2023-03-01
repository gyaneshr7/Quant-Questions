const router = require('express').Router();
const mongoose = require('mongoose')
const User = require('../models/User');
const Questions = require('../models/Questions');

// update user on submission of answer
router.put('/submittedans/:id', async (req, res) => {
    try {
        console.log(req.body);
        const data = await User.findOneAndUpdate({ _id: req.params.id }, {
            totalSubmissions: req.body.totalSubmissions,
            correctAns: req.body.correctAns,
            score: req.body.score,
            wrongAns: req.body.wrongAns,
            $push: { submittedQuestions: req.body.submittedQuestions},
        },{new:true}).populate('submittedQuestions');
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get user by id
router.get('/:id', async (req, res) => {
    try {
        const data = await User.aggregate([{ $match: { _id: mongoose.Types.ObjectId(req.params.id) } }]);
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Fetch attempted questions of a user
router.get('/get/all/attempted/question/:id', async (req, res) => {
    try {
        const questions = await User.find({_id:req.params.id}).populate('submittedQuestions.question');
        res.status(500).json(questions[0]);
    } catch (error) {
        res.status(500).json(error);
    }
})

// update unique correct answers of a user
router.put('/correct/answers/:id', async (req, res) => {
    try {
        const data = await User.findOneAndUpdate({ _id: req.params.id }, {
            $push: { correctAnswers: req.body},
        },{new:true}).populate('submittedQuestions');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
})

// delete array elements of correct Answers
router.put('/delete/correct/answers/:id', async (req, res) => {
    try {
        const result = await User.updateMany({ _id: req.params.id },{ "$pull": { "submittedQuestions": {  } }} )
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error);
    }
})


module.exports = router;