const router = require('express').Router();
const mongoose = require('mongoose')
const Category = require('../models/Categories')

router.put('/addcategory/:category',async(req,res)=>{
    console.log(req.body,req.params.category);
    const val ={
        name:req.body.value,
    }
    try {
        if(req.params.category=='firms'){
            const data = await Category.findOne({'firms':{$elemMatch:{name: req.body.value}}})
            if(!data){
                const update = await Category.updateOne({},{$push: { firms: val }},{new:true})
                res.status(200).json(update)
            }else{
                res.status(200).json("This field already exist...")
            }
        }else if(req.params.category=='category'){
            const data = await Category.findOne({'category':{$elemMatch:{name: req.body.value}}})
            console.log(data);
            if(!data){
                const update = await Category.updateOne({},{$push: { category: val }},{new:true})
                res.status(200).json(update)
            }
        }else if(req.params.category=='answerType'){
            const data = await Category.findOne({'answertype':{$elemMatch:{name: req.body.value}}})
            console.log(data);
            if(!data){
                const update = await Category.updateOne({},{$push: { category: val }},{new:true})
                res.status(200).json(update)
            }
        }else if(req.params.category=='divisions'){
            const data = await Category.findOne({'divisions':{$elemMatch:{name: req.body.value}}})
            console.log(data);
            if(!data){
                const update = await Category.updateOne({},{$push: { divisions: val }},{new:true})
                res.status(200).json(update)
            }
        }else if(req.params.category=='positions'){
            const data = await Category.findOne({'positions':{$elemMatch:{name: req.body.value}}})
            console.log(data);
            if(!data){
                const update = await Category.updateOne({},{$push: { positions: val }},{new:true})
                res.status(200).json(update)
            }
        }else if(req.params.category=='tags'){
            const data = await Category.findOne({'tags':{$elemMatch:{name: req.body.value}}})
            console.log(data);
            if(!data){
                const update = await Category.updateOne({},{$push: { tags: val }},{new:true})
                res.status(200).json(update)
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/getcategories',async(req,res)=>{
    try {
        const data = await Category.findOne({});
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})

// router.post('/addcategory/:category',async(req,res)=>{
//     const val={
//         name:'Brainteasers',
//         count:3
//     }
//     try {
//         console.log(req.params.category,req.body.value);
//         if(req.params.category=='firms'){
//             const data = await Category.create({firms:val})
//             res.status(200).json(data)
            
//             // if(!data){
//             //     const update = await Category.updateOne({},{$push: { firms: req.body.value }})
//             //     res.status(200).json(update)
//             // }
//         }
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

module.exports = router;