import { string, object, array } from 'yup';

export const bluePrint = [
    { for: 'name', label: 'Taom nomi', type: 'text' },
    { for: 'measure', label: `Taom o'lchov birligi`, type: 'text' },
    { for: 'price', label: 'Taom narxi', type: 'number' },
    { for: 'picture', label: 'Taom rasmi', type: 'file' },
];

export const initial = { name: '', measure: '', price: '', id: '', attachmentId: '', foodId: '' }

export const schema = object().shape({
    foods: array()
        .of(object().shape({
            name: string().trim().required('Nom kiritilmadi'),
            measure: string().trim().required(`O'lcham kiritilmadi`),
            price: string().trim().required('Narx kiritilmadi')
        }))
});