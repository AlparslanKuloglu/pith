const express =require('express')
const router=express.Router()
const Blog =require('../models/Blog')
const multer=require('multer')
const path=require('path')

//storage file with multer
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/blog')
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
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
})

// Get All Blogs 
router.get('/',async(req,res)=>{
    try {
        const promise=await Blog.find({})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Get blog by id
router.get('/:id',async(req,res)=>{
    try {
        const promise=await Blog.findById(req.params.id)
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Post Blogs
router.post('/post',upload.single('image'),async(req,res)=>{
    try {
        const blog=new Blog({
            partner_id:req.body.partner_id,
            title:req.body.title,
            description:req.body.description,
            image:req.file.path,
        })
        const promise=await blog.save()
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Update Blog
router.put('/:id',upload.single('image'),async(req,res)=>{
    try {
        const promise=await Blog.findByIdAndUpdate(req.params.id,
            {
                company_id:req.body.company_id,
                title:req.body.title,
                description:req.body.description,
                image:req.file.path
            },{new:true})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Delete Blog
router.delete('/:id',async(req,res)=>{
    try {
        const promise=await Blog.findByIdAndDelete(req.params.id)
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

module.exports=router