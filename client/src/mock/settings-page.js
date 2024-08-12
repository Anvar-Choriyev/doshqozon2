import useUniqueId from "../hooks/useId";
import * as yup from "yup";


export const userInputs = [
    {
        label: 'Ism',
        fieldName: 'firstName',
        type: 'text',
        id: useUniqueId,
        for: 'name',
    },
    {
        label: 'Familiya',
        fieldName: 'lastName',
        type: 'text',
        id: useUniqueId,
        for: 'surname',
    },
    {
        label: `Telefo'n raqam`,
        fieldName: 'phoneNumber',
        type: 'tel',
        id: useUniqueId,
        for: 'phone',
    },
    {
        label: `Tug'ilgan kun`,
        fieldName: 'birthDate',
        type: 'date',
        id: useUniqueId,
        for: 'birthday',
    },
]
export const schemaPersonal = yup.object().shape({
    firstName: yup
        .string()
        .trim()
        .required("Ism bo'sh bo'lishi mumkum emas")
        .min(2, "Ism kamida 2 ta harf dan iborat bo'lishi kerak")
        .matches(/^[A-Za-z]+$/i, "Ism xato kiritildi"),
    lastName: yup
        .string()
        .trim()
        .required("Familiya bo'sh bo'lishi mumkun emas")
        .min(2, "Familiya kamida 2 ta harf dan iborat bo'lishi kerak")
        .matches(/^[A-Za-z]+$/i, "Familiya xato kiritildi"),
    phoneNumber: yup
        .string()
        .trim()
        .required("Raqam bo'sh bo'lishi mumkun eman")
        .matches(/^[+]998[0-9]/i, 'Raqam xato kiritildi (+998 -- --- --)')
        .min(13, "Raqam 11 xonali sondan iborat bo'lishi kerak")
        .max(13, "Raqam 11 xonali sondan iborat bo'lishi kerak"),
    birthDate: yup
        .string()
        .trim()
        .required(`Tug'ilganlik xaqida ma'lumot kiritilmadi`)
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, `Ma'lumot shu ko'rinishda bo'lishi kerak YYYY-MM-DD`)
});


export const passwordInputs = [
    {
        label: 'Foydalanuvchi nomi',
        fieldName: 'username',
        type: 'text',
        id: useUniqueId,
        for: 'username',
    },
    {
        label: 'Eski parol',
        fieldName: 'oldPassword',
        type: 'password',
        id: useUniqueId,
        for: 'oldPass',
    },
    {
        label: `Yangi parol`,
        fieldName: 'newPassword',
        type: 'password',
        id: useUniqueId,
        for: 'newPass',
    },
    {
        label: `Yangi parolni qaytaring`,
        fieldName: 'newRePassword',
        type: 'password',
        id: useUniqueId,
        for: 'newRePass',
    },
]
export const schemaPassword = yup.object().shape({
    username: yup
        .string()
        .trim()
        .required("Foydalanuvchi nomi bo'sh bo'lishi mumkun emas")
        .min(2, "Foydalanuvchi nomi kamida 2 ta harfdan iborat bo'lishi kerak")
        .matches(/^[A-Za-z]+$/i, "Foydalanuvchi nomi xato"),
    password: yup
        .string()
        .trim()
        .required("Parol bo'sh bo'lishi mumkun eman")
        .min(2, "Parol kamida 4 harf dan iborat bo'lishi kerak")
        .matches(/[A-Za-z0-9]+$/i),
});