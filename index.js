const express =require('express')
const path =require('path')
const cookieParser =require('cookie-parser')
const logger =require('morgan')
const db =require('./helper/db')
const dotenv=require('dotenv')
dotenv.config()
const partnerRouter =require('./routes/partner')
const companyRouter =require('./routes/company')
const blogRouter =require('./routes/blog')
const loginCompanyRouter =require('./routes/login_company')
const loginPartnerRouter =require('./routes/login_partner')
const mailOps =require('./routes/mailOps')
const publicRouter=require('./routes/public')
const scheduleRouter=require('./routes/schedule')
const verifyToken =require('./middleware/verify-token')
const config =require('./config')
const bodyParser =require('body-parser')
const meetingRouter =require('./routes/meeting')
const cors =require('cors')
const notificationRouter =require('./routes/notification')
const app = express()
const http=require('http')
const helmet= require('helmet')
const compression=require('compression')

const {port,allowedDomains}=config;

app.set("api_secret_key", config.api_secret_key);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//db connection
db()
//view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.use(cors({origin:['https://pitgrowth.com','http://pitgrowth.com',,'https://pithgrowthfront.simurgify.com','http://pithgrowth.simurgify.com','http://pithgrowthfront.simurgify.com'],credentials:true}))
app.use(cors())
app.use(helmet())
app.use(compression())
//app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static('uploads'))

//app.use('/api/verify',verifyToken)
app.use('/api',loginCompanyRouter)
app.use('/api/public',publicRouter)
app.use('/api/partner',loginPartnerRouter)
app.use('/api/verify/notification',notificationRouter)
app.use('/api/verify/schedule',scheduleRouter)
app.use('/api/verify/partner', partnerRouter);
app.use('/api/verify/meeting',meetingRouter)
app.use('/api/verify/company',companyRouter)
app.use('/api/mailOps',mailOps)
app.use('/api/verify/blog',blogRouter)

app.get('/',(req,res)=>{
    console.log(req.app)

    return res.send('hello')
})

const server=http.createServer(app)

server.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`)
})