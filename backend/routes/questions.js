const router = require('express').Router();
const mongoose = require('mongoose')
const Questions = require('../models/Questions');
const User = require('../models/User');

// Add questions
router.post('/add', async (req, res) => {
    console.log("This is request",req.body);
    try {
        const question = await Questions.create(req.body);
        //console.log(question);
        res.status(500).json(question);
    } catch (error) {
        res.status(500).json(error);  
    }
})
router.get('/getallquestions', async (req, res) => {
    try {
        const questions = await Questions.aggregate([{ $match: {} }]);
        res.json(questions);
    } catch (error) {
        res.status(500).json(error);
    } 
})
// Fetch all questions
router.get('/getallquestions/:isinterviewee', async (req, res) => {
    try {
        //   getallquestions/:isinterviewee here :isinterviewee is the parameter of the request which is variable in nature it is true when 
        const isinterviewee=req.params.isinterviewee; //the variable interviewee stores the boolean value of parameter from the request 
        let questions=[];
        // const userid = req.params.id;
        console.log(isinterviewee);   
        const isInterviewee = isinterviewee === 'true'?"true":"false"; // Parse to boolean
        console.log(typeof(isinterviewee))

        if (isInterviewee=="true"){
            
             questions = await Questions.aggregate([
                { $match: { category: 'Feedbox Recruitment' } }
            ]);
            //  res.status(200).json(questions); 
        } 
        else{
            questions = await Questions.aggregate([{ $match: { category: { $nin: ["Feedbox Recruitment"] } } }]);
            // questions = await Questions.aggregate([{$match: { category: { $in: ['brainteaser','verbal','Mathematics','Profit and Loss','Trigonometry' ] } } }]);
        console.log("hi",questions)
        // res.status(200).json(questions);
        }
          res.status(200).json(questions);
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

// Fetch all questions by category
router.get('/getquestions/category/:category', async (req, res) => {
    console.log(req.params.category);
    try {
        const questions = await Questions.aggregate([{
            $match: {
                category: {
                    $eq: req.params.category
                }
            }
        }]);
        res.status(500).json(questions);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Fetch all questions by difficulty
router.get('/getquestions/difficulty/:difficulty', async (req, res) => {
    try {
        const questions = await Questions.aggregate([{
            $match: {
                difficulty: {
                    $eq: req.params.difficulty
                }
            }
        }]);
        res.status(500).json(questions);
    } catch (error) {
        res.status(500).json(error);
    }
})

// fetch all questions of both considering category and difficulty
router.get('/getquestions/difficultycategory/:category/:difficulty', async (req, res) => {
    try {
        const questions = await Questions.aggregate([{ $match: { $and: [{ difficulty: { $eq: req.params.difficulty } }, { category: { $eq: req.params.category } }] } }]);
        res.status(500).json(questions);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Fetch random question
router.get('/get/random/question', async (req, res) => {
    try {
        const questions = await Questions.aggregate([
            { $match: {} },
            { $sample: { size: 10 } }
        ])
        res.status(500).json(questions);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Fetch questions by firm
router.get('/firms/:id/:firm', async (req, res) => {
    try {
        const data = await User.aggregate([{ $match: { _id: mongoose.Types.ObjectId(req.params.id) } }]);
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json(error);
    }
})

// update question when a user submits a answer
router.put('/updateans/:id', async (req, res) => {
    try {
        console.log(req.body);
        const data = await Questions.findOneAndUpdate({ _id: req.params.id }, {
            submission:req.body.submission,
            accepted:req.body.accepted
        },{new:true})
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
})

// update questions
router.put('/update/questions/:id', async (req, res) => {
    try {
        console.log(req.body);
        const data = await Questions.findOneAndUpdate({ _id: req.params.id },req.body,{new:true})
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
})



// DELETE A QUESTION
router.delete('/:id',async (req,res)=>{
    try {
        const data = await Questions.deleteOne({_id:req.params.id});
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;