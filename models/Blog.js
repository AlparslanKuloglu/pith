const mongoose=require('mongoose')
const Schema=mongoose.Schema
const now =new Date()

const BlogSchema=new Schema({
    partner_id:{
        type:mongoose.Types.ObjectId,
        required:[true,'Company id is requried!']
    },
    title:{
        type:String,
        required:[true,'Title is required!']
    },
    description:{
        type:String,
        required:[true,'Description is required!']
    },
    image:{
        type:String,
        required:[true,'Enter product image !']
    },
    created_at:{
        type:String,
        default:now
    }
})

module.exports=mongoose.model('blog',BlogSchema)