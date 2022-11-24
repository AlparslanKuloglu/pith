const express =require('express')
const Partner =require('../models/Partner')
const router=express.Router()
const multer=require('multer')
const path=require('path')
const Schedule = require('../models/Schedule')
const Meeting = require('../models/Meeting')
const bcrypt=require('bcryptjs')

//storage file with multer
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/partners')
    },
    filename:(req,file,cb)=>{
        cb(
            null,
            file.fieldname+'-'+Date.now()+path.extname(file.originalname)
        )
    }
})

//file filter
const fileFilter =(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/WebP')
    {
        cb(null,true)
    } else {
        cb(null,false)
    }
}

//photo upload multer 
const upload=multer ({
    storage:storage,
    limits:{
        fileSize:124*124*5
    },
    fileFilter:fileFilter
})

//Update Blog
router.put('/:id',upload.single('logo'),async(req,res)=>{
    try {
        const promise=await Partner.findByIdAndUpdate(req.params.id,{
            email:req.body.email,
            type:req.body.type,
            sub_type:req.body.sub_type,
            contact_name:req.body.contact_name,
            phone:req.body.phone,
            logo:req.file.path,
            company_name:req.body.company_name
        },{new:true})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Get company byid
router.get('/details/byid/:id',async(req,res)=>{
    try {
        const {contact_name,company_name,email,phone}=await Partner.findById(req.params.id)
        res.json({contact_name,company_name,email,phone})
    } catch (error) {
        res.json(error)
    }
})

//update partner without logo
router.put('/update/:id',async (req,res)=>{
     try {
        const salt= bcrypt.genSaltSync(5)
        if(req.body.old_password && req.body.new_password)
        {
            const {company,company_name,email,new_password,old_password}=req.body
            const promise=await Partner.findById(req.params.id)
            const checkIsTrue=await bcrypt.compare(old_password,promise.password)
            if(!checkIsTrue)
            {
                res.json({message:'Wrong old password.',status:500})
            } else {
                const key=await bcrypt.hash(new_password,salt)
                try {
                const newPartner=await Partner.findByIdAndUpdate(req.params.id,{
                    email,
                    company,
                    company_name,
                    password:key
                },{new:true})
                res.json(newPartner)
                } catch (error) {
                    res.json(error)
                }
            }
        } else {
            try {
                const promise=await Partner.findByIdAndUpdate(req.params.id,req.body,{new:true})
                res.json(promise)
            } catch (error) {
                res.json(error)
            }
        }
    } catch (error) {
        res.json(error)        
    }
})

//Get partner by email
router.get('/email/:email',async(req,res)=>{
    try {
        const promise=await Partner.findOne({email:req.params.email})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//get partner with type and sub_Type
router.get('/withtype',async(req,res)=>{
    try {
        const promise=await Partner.findOne({type:req.body.type,sub_type:req.body.sub_type})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//get partner with type and sub_Type
router.post('/filter_schedule',async(req,res)=>{
    try {
        const clocks=[
            "1:00 am","1:15 am","1:30 am","1:45 am",
            "2:00 am","2:15 am","2:30 am","2:45 am",
            "3:00 am","3:15 am","3:30 am","3:45 am",
            "4:00 am","4:15 am","4:30 am","4:45 am",
            "5:00 am","5:15 am","5:30 am","5:45 am",
            "6:00 am","6:15 am","6:30 am","6:45 am",
            "7:00 am","7:15 am","7:30 am","7:45 am",
            "8:00 am","8:15 am","8:30 am","8:45 am",
            "9:00 am","9:15 am","9:30 am","9:45 am",
            "10:00 am","10:15 am","10:30 am","10:45 am",
            "11:00 am","11:15 am","11:30 am","11:45 am",
            "12:00 am","12:15 pm","12:30 pm","12:45 pm",
            "1:00 pm","1:15 pm","1:30 pm","1:45 pm",
            "2:00 pm","2:15 pm","2:30 pm","2:45 pm",
            "3:00 pm","3:15 pm","3:30 pm","3:45 pm",
            "4:00 pm","4:15 pm","4:30 pm","4:45 pm",
            "5:00 pm","5:15 pm","5:30 pm","5:45 pm",
            "6:00 pm","6:15 pm","6:30 pm","6:45 pm",
            "7:00 pm","7:15 pm","7:30 pm","7:45 pm",
            "8:00 pm","8:15 pm","8:30 pm","8:45 pm",
            "9:00 pm","9:15 pm","9:30 pm","9:45 pm",
            "10:00 pm","10:15 pm","10:30 pm","10:45 pm",
            "11:00 pm","11:15 pm","11:30 pm","11:45 pm",
            "12:00 pm","12:15 am","12:30 am","12:45 am",
        ]
        const promise=await Partner.find({type:req.body.type})
        const schedule=[]
        if(promise.length>1){
            const filterbySub=promise.filter(el=>el.sub_type.includes(req.body.sub_type))
            const resschedule=await Schedule.findOne({partner_id:filterbySub[0]._id})
            schedule.push(resschedule)
        }else {
            const resschedule=await Schedule.findOne({partner_id:promise[0]._id})
            schedule.push(resschedule)
        }
        const meetings=await Meeting.find({partner_id:promise.id})
        const currentMeets=meetings.filter(el=>el.date.includes(req.body.day)).map(data=>data.time)
        if(req.body.day==='Saturday'){
            const end=[]
            const start=[]
            if(schedule[0].Saturday_close_hour.includes('am'))
            {
                end.push(`${schedule[0].Saturday_close_hour.replace(' am','')}:${schedule[0].Saturday_close_min} am`)
            } 
            else if(schedule[0].Saturday_close_hour.includes('pm'))
            {
                end.push(`${schedule[0].Saturday_close_hour.replace(' pm','')}:${schedule[0].Saturday_close_min} pm`)
            }
            if(schedule[0].Saturday_start_hour.includes('am'))
            {
                start.push(`${schedule[0].Saturday_start_hour.replace(' am','')}:${schedule[0].Saturday_start_min} am`)
            }
            else if(schedule[0].Saturday_start_hour.includes('pm'))
            {
                start.push(`${schedule[0].Saturday_start_hour.replace(' pm','')}:${schedule[0].Saturday_start_min} pm`)
            }
            const findIndexStart=clocks.indexOf(start[0])
            const findIndexEnd=clocks.indexOf(end[0])
            const times=clocks.slice(findIndexStart,findIndexEnd)
            currentMeets.map(data=>{
                const index=times.indexOf(data)
                times.splice(index,1)
            })
            res.json({time:times,timed:currentMeets})
        } else if(req.body.day==='Sunday'){
            const end=[]
            const start=[]
            if(schedule[0].Sunday_close_hour.includes('am'))
            {
                end.push(`${schedule[0].Sunday_close_hour.replace(' am','')}:${schedule[0].Sunday_close_min} am`)
            } 
            else if(schedule[0].Sunday_close_hour.includes('pm'))
            {
                end.push(`${schedule[0].Sunday_close_hour.replace(' pm','')}:${schedule[0].Sunday_close_min} pm`)
            }
            if(schedule[0].Sunday_start_hour.includes('am'))
            {
                start.push(`${schedule[0].Sunday_start_hour.replace(' am','')}:${schedule[0].Sunday_start_min} am`)
            }
            else if(schedule[0].Sunday_start_hour.includes('pm'))
            {
                start.push(`${schedule[0].Sunday_start_hour.replace(' pm','')}:${schedule[0].Sunday_start_min} pm`)
            }
            const findIndexStart=clocks.indexOf(start[0])
            const findIndexEnd=clocks.indexOf(end[0])
            const times=clocks.slice(findIndexStart,findIndexEnd)
            currentMeets.map(data=>{
                const index=times.indexOf(data)
                times.splice(index,1)
            })
            res.json({time:times,timed:currentMeets})
        }else if(req.body.day==='Monday'){
            const end=[]
            const start=[]
            if(schedule[0].Monday_close_hour.includes('am'))
            {
                end.push(`${schedule[0].Monday_close_hour.replace(' am','')}:${schedule[0].Monday_close_min} am`)
            } 
            else if(schedule[0].Monday_close_hour.includes('pm'))
            {
                end.push(`${schedule[0].Monday_close_hour.replace(' pm','')}:${schedule[0].Monday_close_min} pm`)
            }
            if(schedule[0].Monday_start_hour.includes('am'))
            {
                start.push(`${schedule[0].Monday_start_hour.replace(' am','')}:${schedule[0].Monday_start_min} am`)
            }
            else if(schedule[0].Monday_start_hour.includes('pm'))
            {
                start.push(`${schedule[0].Monday_start_hour.replace(' pm','')}:${schedule[0].Monday_start_min} pm`)
            }
            const findIndexStart=clocks.indexOf(start[0])
            const findIndexEnd=clocks.indexOf(end[0])
            const times=clocks.slice(findIndexStart,findIndexEnd)
            currentMeets.map(data=>{
                const index=times.indexOf(data)
                times.splice(index,1)
            })
            res.json({time:times,timed:currentMeets})
        }else if(req.body.day==='Wednesday'){
            const end=[]
            const start=[]
            if(schedule[0].Wednesday_close_hour.includes('am'))
            {
                end.push(`${schedule[0].Wednesday_close_hour.replace(' am','')}:${schedule[0].Wednesday_close_min} am`)
            } 
            else if(schedule[0].Wednesday_close_hour.includes('pm'))
            {
                end.push(`${schedule[0].Wednesday_close_hour.replace(' pm','')}:${schedule[0].Wednesday_close_min} pm`)
            }
            if(schedule[0].Wednesday_start_hour.includes('am'))
            {
                start.push(`${schedule[0].Wednesday_start_hour.replace(' am','')}:${schedule[0].Wednesday_start_min} am`)
            }
            else if(schedule[0].Wednesday_start_hour.includes('pm'))
            {
                start.push(`${schedule[0].Wednesday_start_hour.replace(' pm','')}:${schedule[0].Wednesday_start_min} pm`)
            }
            const findIndexStart=clocks.indexOf(start[0])
            const findIndexEnd=clocks.indexOf(end[0])
            const times=clocks.slice(findIndexStart,findIndexEnd)
            currentMeets.map(data=>{
                const index=times.indexOf(data)
                times.splice(index,1)
            })
            res.json({time:times,timed:currentMeets})
        }else if(req.body.day==='Thursday'){
            const end=[]
            const start=[]
            if(schedule[0].Thursday_close_hour.includes('am'))
            {
                end.push(`${schedule[0].Thursday_close_hour.replace(' am','')}:${schedule[0].Thursday_close_min} am`)
            } 
            else if(schedule[0].Thursday_close_hour.includes('pm'))
            {
                end.push(`${schedule[0].Thursday_close_hour.replace(' pm','')}:${schedule[0].Thursday_close_min} pm`)
            }
            if(schedule[0].Thursday_start_hour.includes('am'))
            {
                start.push(`${schedule[0].Thursday_start_hour.replace(' am','')}:${schedule[0].Thursday_start_min} am`)
            }
            else if(schedule[0].Thursday_start_hour.includes('pm'))
            {
                start.push(`${schedule[0].Thursday_start_hour.replace(' pm','')}:${schedule[0].Thursday_start_min} pm`)
            }
            const findIndexStart=clocks.indexOf(start[0])
            const findIndexEnd=clocks.indexOf(end[0])
            const times=clocks.slice(findIndexStart,findIndexEnd)
            currentMeets.map(data=>{
                const index=times.indexOf(data)
                times.splice(index,1)
            })
            res.json({time:times,timed:currentMeets})
        }else if(req.body.day==='Friday'){
            const start=[]
            const end=[]
            if(schedule[0].Friday_close_hour.includes('am'))
            {
                end.push(`${schedule[0].Friday_close_hour.replace(' am','')}:${schedule[0].Friday_close_min} am`)
            } 
            else if(schedule[0].Friday_close_hour.includes('pm'))
            {
                end.push(`${schedule[0].Friday_close_hour.replace(' pm','')}:${schedule[0].Friday_close_min} pm`)
            }
            if(schedule[0].Friday_start_hour.includes('am'))
            {
                start.push(`${schedule[0].Friday_start_hour.replace(' am','')}:${schedule[0].Friday_start_min} am`)
            }
            else if(schedule[0].Friday_start_hour.includes('pm'))
            {
                start.push(`${schedule[0].Friday_start_hour.replace(' pm','')}:${schedule[0].Friday_start_min} pm`)
            }
            const findIndexStart=clocks.indexOf(start[0])
            const findIndexEnd=clocks.indexOf(end[0])
            const times=clocks.slice(findIndexStart,findIndexEnd)
            currentMeets.map(data=>{
                const index=times.indexOf(data)
                times.splice(index,1)
            })
            res.json({time:times,timed:currentMeets})
        }else if(req.body.day==='Tuesday'){
            const start=[]
            const end=[]
            if(schedule[0].Tuesday_close_hour.includes('am'))
            {
                end.push(`${schedule[0].Tuesday_close_hour.replace(' am','')}:${schedule[0].Friday_close_min} am`)
            } 
            else if(schedule[0].Tuesday_close_hour.includes('pm'))
            {
                end.push(`${schedule[0].Tuesday_close_hour.replace(' pm','')}:${schedule[0].Friday_close_min} pm`)
            }
            if(schedule[0].Tuesday_start_hour.includes('am'))
            {
                start.push(`${schedule[0].Tuesday_start_hour.replace(' am','')}:${schedule[0].Tuesday_start_min} am`)
            }
            else if(schedule[0].Tuesday_start_hour.includes('pm'))
            {
                start.push(`${schedule[0].Tuesday_start_hour.replace(' pm','')}:${schedule[0].Tuesday_start_min} pm`)
            }
            const findIndexStart=clocks.indexOf(start[0])
            const findIndexEnd=clocks.indexOf(end[0])
            const times=clocks.slice(findIndexStart,findIndexEnd)
            currentMeets.map(data=>{
                const index=times.indexOf(data)
                times.splice(index,1)
            })
            res.json({time:times,timed:currentMeets})
        }
    } catch (error) {
        res.json(error)
    }
})

router.post('/get_schedule',async(req,res)=>{
    try {
        const promise=await Partner.find({type:req.body.type})
        if(promise.length>1){
            const filterbySub=promise.filter(el=>el.sub_type.includes(req.body.sub_type))
            const schedule=await Schedule.findOne({partner_id:filterbySub[0].id})
            res.json({schedule:schedule,filterbySub:filterbySub})  
        }else {
            const schedule=await Schedule.findOne({partner_id:promise[0].id})
            res.json({schedule:schedule,filterbySub:promise})    
        }
    } catch (error) {
        res.json(error)
    }
})

module.exports=router