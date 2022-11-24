const express =require('express')
const Partner =require('../models/Partner')
const router=express.Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//Get all partners
router.get('/',async(req,res)=>{
    try {
        const promise=await Partner.find({})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//partner authenticate
router.post('/authenticate',(req,res)=>{
    const {email,password}=req.body
    Partner.findOne({
        email
    },
    (err,user)=>{
        if(err) throw err
        if(!user){
            res.json({
                message:'Authenticate faild , user not found.',
                status:500
            })
        } else {
            bcrypt.compare(password,user.password).then(result=>{
                if(!result)
                {
                    res.json({message:'Authentication faild , wrong password.',status:500})
                } else {
                    const payload={
                        email
                    }
                    const token = jwt.sign(payload,req.app.get('api_secret_key'))
                    res.json({
                        message:'Email and Password Correct123',
                        token,
                        email,
                        id:user._id
                    })
                }
            })
        }
    }
    )
})

//Post partner
router.post('/create_partner',async (req,res)=>{
    const {password,logo,company_name,phone,email,contact_name,type,sub_type}=req.body
    const salt=bcrypt.genSaltSync(5)
    if(password.length < 8)
    {
    res.json({message:'Password must be greater than eight'})
    } else if (password.length > 16)
    {
    res.json({message:'Password must be less than sixteen'})
    } else 
    {
    const key=await bcrypt.hash(password,salt)
        try {
            const partner =new Partner({
                company_name,
                phone,
                email,
                contact_name,
                type,
                sub_type,
                password:key
            })
            const promise=await partner.save()
            res.json(promise)
        } catch (error) {
            throw error
        }
    }
})

module.exports=router
