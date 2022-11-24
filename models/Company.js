const mongoose=require('mongoose')
const Schema=mongoose.Schema
const now =new Date()

const CompanySchema=new Schema({
    company_name:{
        type:String,
        required:[true,'Company name is required!']
    },
    name:{
        type:String,
        required:[true,'Name is required!']
    },
    project_type:{
        type:String,
        required:[true,'Project type is required!']
    },
    phone:{
        type:String,
        required:[true,'Phone is required!']
    },
    email:{
        type:String,
        required:[true,'Email is requried!'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required!']
    },
    people_count:{
        type:String,
        required:[true,'People count is required!']
    },
    project_status:{
        type:String,
        required:[true,'Project status is required!']
    },
    contact:{
        type:String,
        required:[true,'Contact is required!']
    },
    authCode:{
        type:String,
    },
    authStatu:{
        type:Number,
    },

    created_at:{
        type:String,
        default:now
    }
})

module.exports=mongoose.model('company',CompanySchema)