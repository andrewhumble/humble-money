import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { BudgetProvider } from './context/BudgetContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSizeHeading3: 14,
        },
      }}
    >
      <BudgetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </BudgetProvider>
    </ConfigProvider>
  );
}

export default App;
