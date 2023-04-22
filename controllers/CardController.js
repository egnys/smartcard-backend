import CardSchema from '../models/Card.js'
import card from "../models/Card.js";

export const getAll = async (req, res) =>{
    try {
        const cards = await CardSchema.find().populate('user').exec()
        res.json(cards)
    }
    catch (err){
        console.log(err)
        res.status(500).json({
            message: "Не вдалося знайти записи"
        })
    }
}
export const getAllById = async (req, res) =>{
    try {
        const userId = req.params.id
        const cards = await CardSchema.find({user: {_id: userId}}).populate('user').exec()
        res.json(cards)
    }
    catch (err){
        console.log(err)
        res.status(500).json({
            message: "Не вдалося знайти записи"
        })
    }
}
export const getOne = async (req, res) =>{
    try {
        const cardId = req.params.id
        const card = await CardSchema.findOne({user : { _id: cardId}}).populate('user').exec()
        // const card = await CardSchema.findOne({_id: cardId})
        res.json(card)
    }
    catch (err){
        console.log(err)
        res.status(500).json({
            message: "Не вдалося знайти запис"
        })
    }
}
export const remove = async (req, res) =>{
    try {
        const {id} = req.params
        // await CardSchema.findOneAndDelete({
        //     _id: cardId,
        // }, (err, doc) =>{
        //     if (err){
        //         console.log(err)
        //         return res.status(500).json({
        //             message: "Не вдалося видалити запис"
        //         })
        //     }
        //     if (!doc){
        //         console.log(err)
        //         return res.status(404).json({
        //             message: "Не вдалося знайти запис"
        //         })
        //     }
        //     res.json({
        //         success: true
        //     })
        // })
        const product = await CardSchema.findByIdAndDelete(id)
        if (!product){
            return res.status(404).json({message: 'Не вдалося знайти запис'})
        }
        res.status(200).json(product)
    }
    catch (err){
        console.log(err)
        res.status(500).json({
            message: "Не вдалося видалити запис"
        })
    }
}
export const create = async (req, res) =>{
    try {
        const doc = new CardSchema({
            word: req.body.word,
            translation: req.body.translation,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        })
        const card = await doc.save()
        res.json(card)
    } catch (err){
        console.log(err)
        res.status(500).json({
            message: "Не вдалося створити новий запис"
        })
    }
}

export const update = async (req, res) =>{
    try {
        const cardId = req.params.id
        await CardSchema.updateOne({
            _id: cardId,
        }, {
            word: req.body.word,
            translation: req.body.translation,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        })
        res.json({
            success: true
        })
    } catch (err){
        console.log(err)
        res.status(500).json({
            message: "Не вдалося оновити запис"
        })
    }
}
export const updateCardLR = async (req, res) =>{
    try {
        const cardId = req.params.id
        await CardSchema.updateOne({
            _id: cardId,
        }, {
            learningRate: req.body.learningRate
        })
        res.json({
            success: true,
            newvalue: req.body.learningRate
        })
    } catch (err){
        console.log(err)
        res.status(500).json({
            message: "Не вдалося оновити запис"
        })
    }
}