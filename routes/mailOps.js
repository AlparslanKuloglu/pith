const Company = require('../models/Company')
const Partner = require('../models/Partner')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const express =require('express')
const router=express.Router()



router.post('/forgotPassword',async(req,res)=>{
    try {

        const partner =await Partner.findOne({email:req.body.email})
        const company =await Company.findOne({email:req.body.email})
        
        if(partner && req.body.email===req.body.email2) {

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
            "receiverEmailAddress": `${partner.email}`,
            "subject": "Change Password",
            "content": `<div> <a href= "https://wwww.pithgrowth.com/api/mailOps/passwordChange?company=${company._id}">BU BAĞLANTIYA TIKLAYARAK SİFRENİZİ SIFIRLAYABİLİRSİNİZ</a> </div> `,
            "startDate": "",
            "finishDate": ""
          }
          }); 

            
        }
        console.log("10")

        if(company && req.body.email===req.body.email2) {

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
            "receiverEmailAddress": `${company.email}`,
            "subject": "Change Password",
            "content": `<div> <a href= "https://wwww.pithgrowth.com/api/mailOps/passwordChange?company=${company._id}">BU BAĞLANTIYA TIKLAYARAK SİFRENİZİ SIFIRLAYABİLİRSİNİZ</a> </div> `,
            "startDate": "",
            "finishDate": ""
          }
          }); 

            
        }

        console.log("10")
        res.send("asd")

    } catch (error) {
        console.log(error)
        res.json(error)
    }
})



router.post('/changePass', async (req,res)=>{

    const company = await Company.findById(req.app.userID)
    const partner = await Partner.findById(req.app.userID)

    if(partner && req.body.password===req.body.password2 ) {
    partner.password= req.body.password
    partner.save()

    res.redirect('/')
    }

    if(company && req.body.password===req.body.password2 ) {
        company.password= req.body.password
        company.save()
    
        res.redirect('/')
        }

})


router.get('/passwordChange',async (req,res)=>{
    console.log("196")
const partner = await Partner.findById(req.query.company)
const company = await Company.findById(req.query.company)


if(partner) {
    const email = partner.email
    Partner.findOne({
        email : email
    },
    (err,user)=>{
        if(err) throw err
        if(!user){
            res.json({
                message:'Authenticate faild , user not found.',
                status:500
            })
        } else {
        
                    const payload={
                        email: email
                    }
                    const token = jwt.sign(payload,req.app.get('api_secret_key'))
                    req.app.userID = partner._id

    

                    res.redirect('/forgotpassword.html')
                
           
        }
    }
    )}

if(company) {

    const email = company.email
    Company.findOne({
        email : email
    },
    (err,user)=>{
        if(err) throw err
        if(!user){
            res.json({
                message:'Authenticate faild , user not found.',
                status:500
            })
        } else {
        
                    const payload={
                        email: email
                    }
                    const token = jwt.sign(payload,req.app.get('api_secret_key'))
                    req.app.userID = company._id

                    res.redirect('/forgotpassword.html')
                
           
        }
    }
    )



}



})







module.exports=router
