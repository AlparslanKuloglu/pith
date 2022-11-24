const mongoose=require('mongoose')
const Schema=mongoose.Schema
const now =new Date()

const PartnerSchema=new Schema({
    company_name:{
        type:String,
        required:[true,'Name is Required!']
    },
    type:{
        type:String,
        reqiured:[true,'Type is required!']
    },
    sub_type:{
        type:Array,
        required:[true,'Sub type is required!']
    },
    contact_name:{
        type:String,
        required:[true,'Contact name is required!']
    },
    logo:{
        type:String,
        default:'/uploads/default.png'
    },
    phone:{
        type:String,
        required:[true,'Phone is Required!']
    },
    email:{
        type:String,
        required:[true,'Email is Requried!'],
        unique:true
    },
    authCode:{
        type:String,
    },
    password:{
        type:String,
        required:[true,'Password is Required!']
    },
    created_at:{
        type:String,
        default:now
    }
})

module.exports=mongoose.model('partner',PartnerSchema)