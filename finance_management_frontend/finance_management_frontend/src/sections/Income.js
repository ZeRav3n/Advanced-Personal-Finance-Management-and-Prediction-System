import React, {useState, useEffect} from "react";
import incomeService from "../services/incomeService";

const Income = () => {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchIncomes = async () => {
            setLoading(true);
            const response = await incomeService.getAllIncomes();
            if (response.error) {
                setError(response.error);
            } else {
                setIncomes(response.data);
            }
            setLoading(false);
        };
        fetchIncomes();
    }, []);

    return(
        <div>
            <h1>Income</h1>
            {loading ? (
                <p>Loading incomes...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {incomes.map((income) => (
                        <li key={income.id}>
                            {income.name}: ${income.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Income;