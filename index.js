import express from 'express';
import fs from 'fs'
import mongoose from "mongoose";
import multer from 'multer';
import cors from 'cors'
import {registerValidator, loginValidator, cardValidator} from './validations.js'

import {checkAuth,handleValidErrors} from './utils/index.js'

import {UserController, CardController} from './controllers/index.js'


mongoose.set('strictQuery', false)

//  "mongodb+srv://flinforever:VoVYoeJCI1XhC4DY@cluster0.vsfqlyj.mongodb.net/?retryWrites=true&w=majority"
// 
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>{
        console.log('bd ok')
    })
    .catch((err) => console.log('BD ERROR',err))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        if(!fs.existsSync('uploads')){
            fs.mkdirSync('uploads')
        }
        cb(null, 'uploads')
    },
    filename: (_, file, cb) =>{
        cb(null, file.originalname)
    },
})
const upload = multer({storage})
app.use(express.json())
app.use(cors())

app.use('/uploads', express.static('uploads'))
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/auth/login', loginValidator, handleValidErrors, UserController.login)
app.post('/auth/register', registerValidator, handleValidErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.authMe)

app.post('/upload', checkAuth, upload.single('image'), (req,res) =>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.get('/cards', CardController.getAll)
app.get('/cards/:id', CardController.getAllById)
// app.get('/cards/:id', CardController.getOne)
app.post('/cards', checkAuth, cardValidator, handleValidErrors, CardController.create)
app.delete('/cards/:id',checkAuth, CardController.remove)
app.patch('/cards/:id', checkAuth, cardValidator, handleValidErrors, CardController.update)
app.patch('/card/:id', checkAuth, cardValidator, handleValidErrors, CardController.updateCardLR)

app.listen(process.env.PORT || 4000, (err) =>{
// app.listen(4000, (err) =>{
    if (err){
        return console.log(err)
    }
    console.log('Server OK')
})