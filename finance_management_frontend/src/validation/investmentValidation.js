import * as Yup from 'yup';

export const investmentValidationSchema = Yup.object().shape({
    name: Yup.string().required('Investment name is required'),
    amount: Yup.number()
        .typeError('Amount must be a number')
        .positive('Amount must be positive')
        .required('Amount is required'),
    date: Yup.date().required('Date is required'),
});