const router = require('express').Router();
const mongoose = require('mongoose')
const Questions = require('../models/Questions');
const User = require('../models/User');

// Add questions
router.post('/add', async (req, res) => {
    console.log(req.body);
    try {
        const question = await Questions.create(req.body);
        res.status(500).json(question);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Fetch all questions
router.get('/getallquestions', async (req, res) => {
    try {
        const questions = await Questions.aggregate([{ $match: {} }]);
        res.status(500).json(questions);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Fetch all questions by category
router.get('/getquestions/category/:category', async (req, res) => {
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
            { $sample: { size: 1 } }
        ])
        res.status(500).json(questions);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;