import {validationResult} from "express-validator";

export default (err, res, req, next) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return req.status(400).json(errors.array())
    }
    next()
}