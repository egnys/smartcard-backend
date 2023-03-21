import {body} from 'express-validator'

export const loginValidator = [
    body('email', "Некоректний формат пошти").isEmail(),
    body('password', "Пароль повинен мати мінімум 5 символів").isLength({min: 5}),
]
export const registerValidator = [
    body('firstName', "Вкажіть ім'я").isLength({min: 2}),
    body('lastName', "Вкажіть прізвище").isLength({min: 2}),
    body('email', "Некоректний формат пошти").isEmail(),
    body('password', "Пароль повинен мати мінімум 5 символів").isLength({min: 5}),
    body('avatarUrl', "Некоректне посилання на аватар").optional().isURL(),
]
export const cardValidator = [
    body('word', "Слово повинно мати більше одного символа").isLength({min: 1}).isString(),
    body('translation', "Слово повинно мати більше одного символа").isLength({min: 1}).isString(),
    body('imageUrl', "Некоректне посилання на картинку").optional().isString(),
]
