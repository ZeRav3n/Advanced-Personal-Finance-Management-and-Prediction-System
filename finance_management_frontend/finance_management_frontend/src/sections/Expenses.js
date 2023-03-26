import React, { useState, useEffect } from 'react';
import expenseService from '../services/expenseService';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      const response = await expenseService.getAllExpenses();
      
      if (response.error) {
        setError(response.error);
      } else {
        setExpenses(response.data);
      }
      
      setLoading(false);
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      {loading ? (
        <p>Loading expenses...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>{expense.name}: ${expense.amount}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Expenses;