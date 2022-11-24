const mongoose=require('mongoose')
const Schema=mongoose.Schema
const now =new Date()

const MeetingSchema=new Schema({
    partner_id:{
        type:mongoose.Types.ObjectId,
        required:[true,'Partner id is requried!']
    },
    company_id:{
        type:mongoose.Types.ObjectId,
        required:[true,'Company id is required!']
    },
    partner_contact_name:{
        type:String,
        required:[true,'partner contact name is required']
    },
    company_name:{
        type:String,
        required:[true,'Company name is required!']
    },
    status:{
        type:String,
        default:'Pending'
    },
    sub_type:{
        type:String,
        required:[true,'Sub type is required!']
    },
    date:{
        type:String,
        required:[true,'Meeting date is required!']
    },
    name:{
        type:String,
        required:false,
        default:'User'
    },
    meet_link:{
        type:String,
        required:false,
        default:'undefined'
    },
    description:{
        type:String,
        required:false,
        default:'Default Explanation'
    },
    time:{
        type:String,
        required:[true,'Time is required!']
    },
    created_at:{
        type:String,
        default:now
    }
})

module.exports=mongoose.model('meeting',MeetingSchema)