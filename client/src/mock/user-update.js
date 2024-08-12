import * as yup from 'yup';

export const userUpdateSchema = yup.object().shape({
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
    gender: yup
        .string()
        .oneOf(['MALE', 'FEMALE'], 'Jinsingizni tanlang')
        .required('Jinsingizni tanlang'),
    phoneNumber: yup
        .string()
        .transform((value) => (value ? value.toString().trim() : ''))
        .required("Telefon raqamingizni kiriting")
        .matches(/^[+]998[0-9]{9}$/i, 'Raqam xato kiritildi (+998 -- --- --)')
        .min(13, "Raqam 11 xonali sondan iborat bo'lishi kerak")
        .max(13, "Raqam 11 xonali sondan iborat bo'lishi kerak"),

    birthDate: yup
        .string()
        .trim()
        .required(`Tug'ilganlik xaqida ma'lumotingizni kiriting`)
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, `Ma'lumot shu ko'rinishda bo'lishi kerak YYYY-MM-DD`),
    // username: yup
    //     .string()
    //     .trim()
    //     .required("Username ni kiriting"),
    userRole: yup
        .string()
        .oneOf(['ADMIN', 'CASHIER'], 'Lavozimni tanlang')
        .required("Lavozimni tanlang")
});