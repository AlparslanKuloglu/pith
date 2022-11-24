const express =require('express')
const Schedule =require('../models/Schedule')
const bcrypt=require('bcryptjs')
const router=express.Router()

//Get all Schedule
router.get('/',async(req,res)=>{
    try {
        const promise=await Schedule.find({})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Get Schedule byid
router.get('/byid/:id',async(req,res)=>{
    try {
        const promise=await Schedule.findById(req.params.id)
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Get Schedule by partner id
router.get('/partner/:id',async(req,res)=>{
    try {
        const promise=await Schedule.findOne({partner_id:req.params.id})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//post schedule
router.post('/',async(req,res)=>{
    try {
        const schedule=new Schedule(req.body)
        const promise=schedule.save()
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//update Schedule
router.put('/update/:id',async(req,res)=>{
    try {
        const promise=await Schedule.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//update Schedule by partner id
router.put('/update/partner/:id',async(req,res)=>{
    try {
        const promise=await Schedule.findOneAndUpdate({partner_id:req.params.id},req.body,{new:true})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

module.exports=router