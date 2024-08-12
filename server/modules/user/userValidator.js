const {body} = require("express-validator")
const User = require("../user/User")
const {Op} = require("sequelize")

exports.createValidator = [
    body("firstName")
        .notEmpty()
        .withMessage("Ism bo'sh bo'lishi mumkin emas"),
    body("lastName")
        .notEmpty()
        .withMessage("Familiya bo'sh bo'lishi mumkin emas"),
    body("phoneNumber")
		.notEmpty()
		.withMessage("Telefon raqam bo'sh bo'lishi mumkin emas")
		.matches(/^[+]998[0-9]{9}$/)
		.withMessage("Telefon raqam xato kiritildi"),
    body("birthDate")
        .notEmpty()
        .withMessage("Tug'ilgan kun bo'sh bo'lmasligi kerak"),
	body("username")
		.notEmpty()
		.withMessage("Login bo'sh bo'lishi mumkin emas")
		.trim()
		.isLowercase()
		.withMessage("Login faqat kichkina harflardan iborat bo'lishi kerak")
		.custom(async(value) => {
			const existedUser = await User.findOne({where: {username:{[Op.eq]: value}}}) 
			if(existedUser) 
			throw new Error("Ushbu login tizimda mavjud, iltimos boshqa login o'ylab toping")
		}),
	body("password")
		.notEmpty()
		.withMessage("Parol bo'sh bo'lishi mumkin emas")
		.isLength({ min: 4 })
		.withMessage("Parol 4 ta belgidan kam bo'lmasligi kerak"),
];

exports.updateValidator = [
    body("firstName")
        .notEmpty()
        .withMessage("Ism bo'sh bo'lishi mumkin emas"),
    body("lastName")
        .notEmpty()
        .withMessage("Familiya bo'sh bo'lishi mumkin emas"),
    body("phoneNumber")
		.notEmpty()
		.withMessage("Telefon raqam bo'sh bo'lishi mumkin emas")
		.matches(/^[+]998[0-9]{9}$/)
		.withMessage("Telefon raqam xato kiritildi"),
    body("birthDate")
        .notEmpty()
        .withMessage("Tug'ilgan kun bo'sh bo'lmasligi kerak"),
]

exports.passwordChangeValidator = [
	body("username")
		.notEmpty()
		.withMessage("Login bo'sh bo'lishi mumkin emas")
		.trim()
		.isLowercase()
		.withMessage("Login faqat kichkina harflardan iborat bo'lishi kerak"),
	body("password")
		.notEmpty()
		.withMessage("Parol bo'sh bo'lishi mumkin emas")
		.isLength({ min: 4 })
		.withMessage("Parol 4 ta belgidan kam bo'lmasligi kerak"),
]