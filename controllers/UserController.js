import {validationResult} from "express-validator";
import bc from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req,res)=>{
    try {

        const password = req.body.password
        const salt = await bc.genSalt(10)
        const hash = await bc.hash(password, salt)
        const doc = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
        })

        const user = await doc.save()

        const token = jwt.sign({
                _id: user._id,
            },
            'ecqwe21e1',
            {
                expiresIn: '30d',
            })
        const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData,
            token
        })
    }
    catch (err){
        console.log(err)
        res.status(500).json({
            message: "Не вдалося створити обліковий запис"
        })
    }
}

export const login = async (req, res) =>{
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        if (!user){
            return res.status(400).json({
                message: "Користувача не знайдено"
            })
        }

        const isValidPass = await bc.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPass){
            return res.status(400).json({
                message: "Неправильний логін чи пароль"
            })
        }
        const token = jwt.sign({
                _id: user._id,
            },
            'ecqwe21e1',
            {
                expiresIn: '30d',
            })
        const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData,
            token
        })
    }
    catch (err){
        console.log(err)
        res.status(500).json({
            message: 'Авторизуватися не вдалося'
        })
    }
}

export const authMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user){
            return res.status(404).json({
                message: "Користувача не знайдено"
            })
        }
        const {passwordHash, ...userData} = user._doc
        res.json({...userData})
    } catch (err){
        console.log(err)
        res.status(500).json({
            message: "Немає доступу"
        })
    }
}