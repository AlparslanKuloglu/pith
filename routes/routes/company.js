const express =require('express')
const Company =require('../models/Company')
const router=express.Router()
const bcrypt=require('bcryptjs')

//Get company byid
router.get('/byid/:id',async(req,res)=>{
    try {
        const promise=await Company.findById(req.params.id)
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Get company byid
router.get('/details/byid/:id',async(req,res)=>{
    try {
        const {name,company_name,email,phone}=await Company.findById(req.params.id)
        res.json({name,company_name,email,phone})
    } catch (error) {
        res.json(error)
    }
})

//Get company by email
router.post('/email',async(req,res)=>{
    try {
        const promise=await Company.findOne({email:req.body.email})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Update company by id
router.put('/update/:id',async(req,res)=>{
    try {
        const salt= bcrypt.genSaltSync(5)
        if(req.body.old_password && req.body.new_password)
        {
            const {company,company_name,email,new_password,old_password}=req.body
            const promise=await Company.findById(req.params.id)
            const changedMail = 0 
            if(!(promise.email===email)){changedMail=1}
            const checkIsTrue=await bcrypt.compare(old_password,promise.password)
            if(!checkIsTrue)
            {
                res.json({message:'Wrong old password.',status:500})
            } else {
                const key=await bcrypt.hash(new_password,salt)
                try {
                const newCompany=await Company.findByIdAndUpdate(req.params.id,{
                    email,
                    company,
                    company_name,
                    password:key
                },{new:true})

             /* if(changedMail===1) {

            const authCode = company_name[0] + email[0] + company_name[1] + email[3]
            newCompany.authCode = authCode
            newCompany.authStatu = 0 
            const accountId = 'eyJBZG1pbklkIjoiMzQ1MTMiLCJFbWFpbCI6InRhbGhhZWxtYWxpQHBpdGdyb3d0aC5jb20iLCJDdXN0b21lcklkIjoiQTgzOEI4OUMxQjVCNEJFRUJCQjU2NDYyOTMxNEE3MTkiLCJDb21wYW55SWQiOjUyNDczLCJJc0V4cHJlc3MiOnRydWV9'

            const tokenRequest =
            await axios('https://diyaccountapi.relateddigital.com/tokens'  , {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             data: {
              "email":"talhaelmali@pitgrowth.com",
              "password":"Theagaed987"
              }
           }); 
          
          
           const token = tokenRequest.data.tokenValue
          
          
           const sendMail =
           await axios(`https://diyaccountapi.relateddigital.com/accounts/${accountId}/transactional-email` , {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + token
           },
           data: {
            "senderProfileId": 60857,
            "receiverEmailAddress": `${email}`,
            "subject": "E-Mail Doğrulama",
            "content": `<h1>Doğrulama Kodunuz:${authCode}<h1/>`,
            "startDate": "",
            "finishDate": ""
          }
          }); 

              } */



                res.json(newCompany)
                } catch (error) {
                    res.json(error)
                }
            }
        } else {
            try {
                const promise=await Company.findByIdAndUpdate(req.params.id,req.body,{new:true})
                res.json(promise)
            } catch (error) {
                res.json(error)
            }
        }
    } catch (error) {
        res.json(error)        
    }
})

module.exports=router