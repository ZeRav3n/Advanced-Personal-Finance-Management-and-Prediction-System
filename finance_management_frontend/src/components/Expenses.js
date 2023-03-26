import React, {useState, useEffect} from 'react';

function Expenses(){
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const response = await fetch('/api/expenses');
        const data = await response.json();
        setExpenses(data.expenses);
    };
    return(
        <div>
            <h1>Expenses</h1>
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id}>
                        {expense.title} - ${expense.amount} - {expense.category} - {expense.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Expenses;