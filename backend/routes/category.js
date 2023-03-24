const router = require('express').Router();
const mongoose = require('mongoose')
const Category = require('../models/Categories')

router.put('/addcategory/:category', async (req, res) => {
    let val;
    if(req.params.category=='category'){
        val={
            name:req.body.value,
            color:req.body.color
        }
    }else{
        val = {
            name: req.body.value,
        }
    }
    console.log(val);
    try {
        const exist = await Category.findOne({});
        if (req.params.category == 'firms') {
            if (exist) {
                const data = await Category.findOne({ 'firms': { $elemMatch: { name: req.body.value } } })
                if (!data) {
                    const update = await Category.updateOne({}, { $push: { firms: val } }, { new: true })
                    console.log("data exists");
                    res.status(200).json(update)
                } else {
                    res.status(200).json("This field already exist...")
                }
            } else {
                const data = await Category.create({ firms: val });
                res.status(200).json(data);
            }
        } else if (req.params.category == 'category') {
            if (exist) {
                const data = await Category.findOne({ 'category': { $elemMatch: { name: req.body.value } } })
                console.log(data);
                if (!data) {
                    const update = await Category.updateOne({}, { $push: { category: val } }, { new: true })
                    res.status(200).json(update)
                } else {
                    res.status(200).json("This field already exist...")
                }
            } else {
                const data = await Category.create({ category: val });
                res.status(200).json(data);
            }
        } else if (req.params.category == 'answerType') {
            if (exist) {
                const data = await Category.findOne({ 'answerType': { $elemMatch: { name: req.body.value } } })
                if (!data) {
                    console.log(req.params.category, val);
                    const update = await Category.updateOne({}, { $push: { answerType: val } }, { new: true })
                    res.status(200).json(update)
                } else {
                    res.status(200).json("This field already exist...")
                }
            } else {
                const data = await Category.create({ answerType: val });
                res.status(200).json(data);
            }
        } else if (req.params.category == 'divisions') {
            if (exist) {
                const data = await Category.findOne({ 'divisions': { $elemMatch: { name: req.body.value } } })
                console.log(data);
                if (!data) {
                    const update = await Category.updateOne({}, { $push: { divisions: val } }, { new: true })
                    res.status(200).json(update)
                } else {
                    res.status(200).json("This field already exist...")
                }
            } else {
                const data = await Category.create({ divisions: val });
                console.log("new data created");
                res.status(200).json(data);
            }
        } else if (req.params.category == 'positions') {
            if (exist) {
                const data = await Category.findOne({ 'positions': { $elemMatch: { name: req.body.value } } })
                console.log(data);
                if (!data) {
                    const update = await Category.updateOne({}, { $push: { positions: val } }, { new: true })
                    res.status(200).json(update)
                } else {
                    res.status(200).json("This field already exist...")
                }
            } else {
                const data = await Category.create({ positions: val });
                console.log("new data created");
                res.status(200).json(data);
            }
        } else if (req.params.category == 'tags') {
            if (exist) {
                const data = await Category.findOne({ 'tags': { $elemMatch: { name: req.body.value } } })
                console.log(data);
                if (!data) {
                    const update = await Category.updateOne({}, { $push: { tags: val } }, { new: true })
                    res.status(200).json(update)
                } else {
                    res.status(200).json("This field already exist...")
                }
            } else {
                const data = await Category.create({ tags: val });
                console.log("new data created");
                res.status(200).json(data);
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/getcategories', async (req, res) => {
    try {
        const data = await Category.findOne({});
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/updatecategory/:category', async (req, res) => {
    console.log(req.body)
    try {
        let response;
        req.body.firmscount.map(async(data)=>{
            const res = await Category.updateOne({'firms.name':data.name},{'$set': {
                'firms.$.count': data.count
            }});
        })
        req.body.divisionscount.map(async(data)=>{
            const res = await Category.updateOne({'divisions.name':data.name},{'$set': {
                'divisions.$.count': data.count
            }});
        })
        req.body.tagscount.map(async(data)=>{
            console.log(data);
            const res = await Category.updateOne({'tags.name':data.name},{'$set': {
                'tags.$.count': data.count
            }});
        })
        req.body.positionscount.map(async(data)=>{
            const res = await Category.updateOne({'positions.name':data.name},{'$set': {
                'positions.$.count': data.count
            }});
        })
        res.status(200).json("OK");
    } catch (error) {
        res.status(500).json(error);
    }
})

// router.post('/addcategory/:category',async(req,res)=>{
//     const val={
//         name:'Brainteasers',
//     }
//     try {
//         // console.log(req.params.category,req.body.value);
//         // if(req.params.category=='firms'){
//             // const data = await Category.create({firms:val})
// const data = await Category.findOne({})
//             res.status(200).json(data);

//             // if(!data){
//             //     const update = await Category.updateOne({},{$push: { firms: req.body.value }})
//             //     res.status(200).json(update)
//             // }
//         }
//     // }
//     catch (error) {
//         res.status(500).json(error);
//     }
// })

module.exports = router;