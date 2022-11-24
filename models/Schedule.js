const mongoose=require('mongoose')
const Schema=mongoose.Schema
const now =new Date()

const ScheduleSchema=new Schema({
    partner_id:{
        type:mongoose.Types.ObjectId,
        required:[true,'Company id  is Required!'],
        unique:true
    },
    Sunday_start_hour:{
        type:String,
        required:false,
        default:'9 am'
    },
    Sunday_start_min:{
        type:String,
        required:false,
        default:'00'
    },
    Sunday_close_hour:{
        type:String,
        required:false,
        default:'9 pm'
    },
    Sunday_close_min:{
        type:String,
        required:false,
        default:'00'
    },
    Sunday_isOpen:{
        type:Boolean,
        required:false,
        default:true
    },
    Monday_start_hour:{
        type:String,
        required:false,
        default:'9 am'
    },
    Monday_start_min:{
        type:String,
        required:false,
        default:'00'
    },
    Monday_close_hour:{
        type:String,
        required:false,
        default:'9 pm'
    },
    Monday_close_min:{
        type:String,
        required:false,
        default:'00'
    },
    Monday_isOpen:{
        type:Boolean,
        required:false,
        default:true
    },
    Tuesday_start_hour:{
        type:String,
        required:false,
        default:'9 am'
    },
    Tuesday_start_min:{
        type:String,
        required:false,
        default:'00'
    },
    Tuesday_close_hour:{
        type:String,
        required:false,
        default:'9 pm'
    },
    Tuesday_close_min:{
        type:String,
        required:false,
        default:'00'
    },
    Tuesday_isOpen:{
        type:Boolean,
        required:false,
        default:true
    },
    Wednesday_start_hour:{
        type:String,
        required:false,
        default:'9 am'
    },
    Wednesday_start_min:{
        type:String,
        required:false,
        default:'00'
    },
    Wednesday_close_hour:{
        type:String,
        required:false,
        default:'9 pm'
    },
    Wednesday_close_min:{
        type:String,
        required:false,
        default:'00'
    },
    Wednesday_isOpen:{
        type:Boolean,
        required:false,
        default:true
    },
    Thursday_start_hour:{
        type:String,
        required:false,
        default:'9 am'
    },
    Thursday_start_min:{
        type:String,
        required:false,
        default:'00'
    },
    Thursday_close_hour:{
        type:String,
        required:false,
        default:'9 pm'
    },
    Thursday_close_min:{
        type:String,
        required:false,
        default:'00'
    },
    Thursday_isOpen:{
        type:Boolean,
        required:false,
        default:true
    },
    Friday_start_hour:{
        type:String,
        required:false,
        default:'9 am'
    },
    Friday_start_min:{
        type:String,
        required:false,
        default:'00'
    },
    Friday_close_hour:{
        type:String,
        required:false,
        default:'9 pm'
    },
    Friday_close_min:{
        type:String,
        required:false,
        default:'00'
    },
    Friday_isOpen:{
        type:Boolean,
        required:false,
        default:true
    },
    Saturday_start_hour:{
        type:String,
        required:false,
        default:'9 am'
    },
    Saturday_start_min:{
        type:String,
        required:false,
        default:'00'
    },
    Saturday_close_hour:{
        type:String,
        required:false,
        default:'9 pm'
    },
    Saturday_close_min:{
        type:String,
        required:false,
        default:'00'
    },
    Saturday_isOpen:{
        type:Boolean,
        required:false,
        default:true
    },
    created_at:{
        type:String,
        default:now
    }
})

module.exports=mongoose.model('schedule',ScheduleSchema)