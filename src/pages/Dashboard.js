import React, { useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import ReviewTransactions from '../components/ReviewTransactions/ReviewTransactions';
import useFetchTransactions from '../hooks/useFetchTransactions';

const Dashboard = () => {
  const { setTransactions } = useContext(BudgetContext);
  const { loading, error } = useFetchTransactions('your-access-token-here', setTransactions);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <ReviewTransactions />
    </div>
  );
};

export default Dashboard;
