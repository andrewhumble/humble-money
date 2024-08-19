export const fetchTransactions = async (accessToken) => {
    try {
        const response = await fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};
