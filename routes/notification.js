const express =require('express')
const Notification =require('../models/Notification')
const router=express.Router()

//Get user notification
router.get('/:user_id',async(req,res)=>{
    try {
        const promise=await Notification.find({user_id:req.params.user_id})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Post Notification
router.post('/',async(req,res)=>{
    try {
        const notification=new Notification(req.body)
        const promise=notification.save()
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

module.exports=router