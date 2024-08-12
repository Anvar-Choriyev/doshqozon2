import { string, object, array } from 'yup';

export const bluePrint = [
    { for: 'name', label: `Taom nomi`, type: 'text' },
    { for: 'picture', label: `Taom rasmi`, type: 'file' },
];

export const initial = { name: '', attachmentId: ''}

export const schema = object().shape({
    categories: array()
        .of(object().shape({
            name: string().trim().required('Nom kiritilmadi'),
        }))
});
export const schemaUpdate = object().shape({
    name: string().trim().required('Nom kiritilmadi'),
});