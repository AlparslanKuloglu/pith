const mongoose=require('mongoose')
const Schema=mongoose.Schema
const now =new Date()

const MessageSchema=new Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        required:[true,'User id is Required!']
    },
    title:{
        type:String,
        required:[true,'Title is requried!']
    },
    message:{
        type:String,
        required:[true,'Message is requried!']
    },
    created_at:{
        type:String,
        default:now
    }
})

module.exports=mongoose.model('message',MessageSchema)