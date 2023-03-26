import React, {useState, useEffect} from "react";
import savingsService from "../services/savingsService";

const Savings = () => {
    const [savings, setSavings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchSavings = async () => {
            setLoading(true);
            const response = await savingsService.getAllSavings();
            if (response.error) {
                setError(response.error);
            } else {
                setSavings(response.data);
            }
            setLoading(false);
        };
        fetchSavings();
    }, []);

    return (
        <div>
            <h1>Savings</h1>
            {loading ? (
                <p>Loading savings...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {savings.map((saving) => (
                        <li key={saving.id}>
                            {saving.name}: ${saving.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Savings;