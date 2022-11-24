const express =require('express')
const router=express.Router()
const Blog =require('../models/Blog')
const Partner =require('../models/Partner')
const Schedule=require('../models/Schedule')
//Get all blogs
router.get('/blogs',async(req,res)=>{
    try {
        const promise=await Blog.find({})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Get companies
router.get('/partners',async(req,res)=>{
    try {
        const promise=await Partner.find({})
        const Datas=[]
        promise.map((data)=>Datas.push({
            id:data.id,
            company_name:data.company_name,
            contact_name:data.contact_name,
            type:data.type,
            sub_type:data.sub_type
        }))
        res.json(Datas)
    } catch (error) {
        res.json(error)
    }
})

//Get Schedule by partnery_id
router.get('/partner/:id',async(req,res)=>{
    try {
        const promise=await Schedule.findOne({partner_id:req.params.id})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

module.exports=router