import React, {useState, useEffect} from "react";
import investmentService from "../services/investmentService";

const Investments = () => {
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchInvestments = async () => {
            setLoading(true);
            const response = await investmentService.getAllInvestments();
            if (response.error) {
                setError(response.error);
            } else {
                setInvestments(response.data);
            }
            setLoading(false);
        };
        fetchInvestments();
    }, []);

    return(
        <div>
            <h1>Investments</h1>
            {loading ? (
                <p>Loading investments...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {investments.map((investment) => (
                        <li key={investment.id}>
                            {investment.name}: ${investment.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Investments;