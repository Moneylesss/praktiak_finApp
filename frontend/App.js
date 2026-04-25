import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const [accountsRes, transactionsRes] = await Promise.all([
        axios.get('/api/accounts'),
        axios.get('/api/transactions')
      ]);
      setAccounts(accountsRes.data);
      setTransactions(transactionsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="app">
      {user ? (
        <Dashboard accounts={accounts} transactions={transactions} />
      ) : (
        <Auth onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
