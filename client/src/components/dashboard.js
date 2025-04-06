import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from './Graph';

function Dashboard() {
  const [txs, setTxs] = useState([]);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('credit');

  const token = localStorage.getItem('token');

  const fetchTxs = async () => {
    const res = await axios.get('http://localhost:5000/api/transactions/history', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTxs(res.data);
  };

  const handleTx = async () => {
    await axios.post('http://localhost:5000/api/transactions', { amount, type }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAmount('');
    fetchTxs();
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    fetchTxs();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <select onChange={e => setType(e.target.value)} value={type}>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        <button onClick={handleTx}>Send</button>
      </div>

      <h3>Transaction History</h3>
      <ul>
        {txs.map((t, i) => (
          <li key={i}>{t.type.toUpperCase()}: ₹{t.amount} on {new Date(t.date).toLocaleDateString()}</li>
        ))}
      </ul>

      <Graph data={txs} />

      <button onClick={logout} style={{ marginTop: 20 }}>Logout</button>
    </div>
  );
}

export default Dashboard;
