import { string, object, array } from 'yup';

export const bluePrint = [
    { for: 'name', label: `Katego'riya nomi`, type: 'text' },
    { for: 'picture', label: `Katego'riya rasmi`, type: 'file' },
    { for: 'color', label: `Katego'riya rangi`, type: 'color' },
];

export const initial = { name: '', attachmentId: '', color: '' }

export const schema = object().shape({
    categories: array()
        .of(object().shape({
            name: string().trim().required('Nom kiritilmadi'),
        }))
});
export const schemaUpdate = object().shape({
    name: string().trim().required('Nom kiritilmadi'),
    color: string().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
});