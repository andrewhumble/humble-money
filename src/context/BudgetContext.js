import React, { createContext, useState } from 'react';

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState(0);
  const [transactions, setTransactions] = useState([]);

  return (
    <BudgetContext.Provider value={{ budget, setBudget, transactions, setTransactions }}>
      {children}
    </BudgetContext.Provider>
  );
};
