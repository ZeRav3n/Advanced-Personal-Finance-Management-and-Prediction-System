import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import { incomeValidationSchema } from "../validation/incomeValidation";

const IncomeForm = ({initialValues, onSubmit, buttonText}) => {
    return(
        <Formik
            initialValues={initialValues}
            validationSchema={incomeValidationSchema}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form>
                    <div>
                        <label htmlFor="name">Income Name:</label>
                        <Field id="name" name="name" placeholder="Income Name" type="text"/>
                        <ErrorMessage name="name"/>
                    </div>
                    <div>
                        <label htmlFor="amount">Amount:</label>
                        <Field id="amount" name="amount" placeholder="Amount" type="number"/>
                        <ErrorMessage name="amount"/>
                    </div>
                    <div>
                        <label htmlFor="date">Date:</label>
                        <Field id="date" name="date" placeholder="Date" type="date"/>
                        <ErrorMessage name="date"/>
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {buttonText}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default IncomeForm;