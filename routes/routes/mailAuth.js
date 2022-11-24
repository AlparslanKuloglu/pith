const Company = require('../models/Company')
const express =require('express')
const router=express.Router()


router.post('/', async (req,res)=>{

    const company = await Company.findById(req.body.companyID)

    if(company.authCode===req.body.code) {

    company.authStatu = 1
    company.save()

    res.redirect('/')

    }

 
   else {res.json({message:'Authentication faild , wrong code.',status:500})}
    


})


module.exports=router
