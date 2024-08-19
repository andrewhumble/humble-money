import React, { useContext, useState } from 'react';
import { BudgetContext } from '../../context/BudgetContext';
import { isToday } from 'date-fns';
import { Card, Table, Typography, Checkbox, Tag } from 'antd';
import { reviewTransactionsLabels as labels } from '../../labels/reviewTransactionsLabels';
import './ReviewTransactions.css';

const { Title, Text } = Typography;

const ReviewTransactions = () => {
  const { transactions } = useContext(BudgetContext);
  const [selectedTransactions, setSelectedTransactions] = useState({});

  // Filter transactions to only include those from today
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return isToday(transactionDate);
  });

  const handleCheckboxChange = (transactionId) => {
    setSelectedTransactions((prevSelected) => ({
      ...prevSelected,
      [transactionId]: !prevSelected[transactionId],
    }));
  };

  // Sort transactions so that selected transactions move to the bottom
  const sortedTransactions = filteredTransactions.sort((a, b) => {
    const isSelectedA = !!selectedTransactions[a.id];
    const isSelectedB = !!selectedTransactions[b.id];
    return isSelectedA - isSelectedB; // Unchecked transactions appear before checked ones
  });

  return (
    <Card className="review-transactions-card">
      <Title level={3} className="review-transactions-title">
        {labels.title}
      </Title>

      {sortedTransactions.length === 0 ? (
        <Text className="no-transactions-text">{labels.noTransactionsMessage}</Text>
      ) : (
        <Table
          dataSource={sortedTransactions}
          showHeader={false}
          columns={[
            {
              title: '', // Empty title for the checkbox column
              dataIndex: 'id',
              key: 'checkbox',
              render: (transactionId) => (
                <div className="checkbox-container">
                  <Checkbox
                    checked={selectedTransactions[transactionId] || false}
                    onChange={() => handleCheckboxChange(transactionId)}
                  />
                </div>
              ),
            },
            {
              title: labels.columns.transactionName,
              dataIndex: 'name',
              key: 'name',
              render: (text, record) => (
                <Text
                  strong
                  className={selectedTransactions[record.id] ? 'crossed-out' : ''}
                >
                  {text}
                </Text>
              ),
            },
            {
              title: labels.columns.category,
              dataIndex: 'category',
              key: 'category',
              render: (categories, record) => (
                <div>
                  {Array.isArray(categories) && categories.map((category) => (
                    <Tag key={category} className={selectedTransactions[record.id] ? 'crossed-out' : ''}>
                      {category}
                    </Tag>
                  ))}
                </div>
              ),
            },            
            {
              title: labels.columns.amount,
              dataIndex: 'amount',
              key: 'amount',
              render: (amount, record) => (
                <Text
                  className={selectedTransactions[record.id] ? 'crossed-out' : ''}
                >
                  ${amount.toFixed(2)}
                </Text>
              ),
            },
          ]}
          pagination={false}
          rowKey="id"
        />
      )}
    </Card>
  );
};

export default ReviewTransactions;
