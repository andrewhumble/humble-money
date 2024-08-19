import { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/apiService';

const mockTransactions = [
    {
        account_id: 'account1',
        amount: 12.34,
        date: '2024-08-20',
        name: 'Mock Grocery Store',
        category: ['Groceries', 'Supermarket'],
        id: 'txn_01',
    },
    {
        account_id: 'account2',
        amount: 45.67,
        date: '2024-08-20',
        name: 'Mock Restaurant',
        category: ['Food and Drink', 'Restaurant'],
        id: 'txn_02',
    },
    {
        account_id: 'account3',
        amount: 123.45,
        date: '2024-08-16',
        name: 'Mock Utility Bill',
        category: ['Bills & Utilities', 'Utility'],
        id: 'txn_03',
    },
];

const useFetchTransactions = (accessToken, setTransactions) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTransactions = async () => {
            try {
                if (process.env.NODE_ENV === 'development') {
                    setTransactions(mockTransactions);
                } else {
                    const data = await fetchTransactions(accessToken);
                    setTransactions(data.transactions);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (accessToken || process.env.NODE_ENV === 'development') {
            getTransactions();
        }
    }, [accessToken, setTransactions]);

    return { loading, error };
};

export default useFetchTransactions;
