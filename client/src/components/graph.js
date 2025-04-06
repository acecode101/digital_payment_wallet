import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function Graph({ data }) {
  const formattedData = data.map((t, i) => ({
    index: i + 1,
    amount: t.amount
  }));

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Transaction Graph</h3>
      <LineChart width={400} height={250} data={formattedData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default Graph;
