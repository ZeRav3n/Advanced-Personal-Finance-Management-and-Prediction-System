import * as Yup from 'yup';

export const expenseValidationSchema = Yup.object().shape({
    name: Yup.string().required('Expense name is required'),
    category: Yup.string().required('Category is required'),
    amount: Yup.number()
        .typeError('Amount must be a number')
        .positive('Amount must be positive')
        .required('Amount is required'),
    date: Yup.date().required('Date is required'),
});