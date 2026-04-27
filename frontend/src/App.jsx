import React, { useState } from 'react';
import './App.css';

function App() {
  const [transactions] = useState([
    { id: 1, time: '09:30', title: 'เงินเดือน', amount: 35000, type: 'income', note: 'โอนเข้าบัญชีหลัก' },
    { id: 2, time: '12:15', title: 'ค่าอาหาร', amount: 80, type: 'expense', note: 'ข้าวราดแกง' },
  ]);

  return (
    <div className="container">
      <header className="header">
        <h1 className="header-title">Recent Transactions</h1>
        <button className="add-icon-btn">+</button>
      </header>
      <main className="list-container">
        {transactions.map((item) => (
          <div key={item.id} className="transaction-card">
            <div className="card-info">
              <span className="card-time">{item.time} | {item.note}</span>
              <h2 className="card-title">{item.title}</h2>
              <p className={`card-amount ${item.type}`}>
                {item.type === 'income' ? '+' : '-'} ฿{item.amount.toLocaleString()}
              </p>
            </div>
            <div className="card-actions">
              <button className="edit-btn">✎</button>
              <button className="delete-btn">🗑</button>
            </div>
          </div>
        ))}
      </main>

      <nav className="nav-wrapper">
        <div className="capsule-nav">
          <button className="nav-link active">💰</button>
          <button className="nav-link">📊</button>
          <button className="nav-link">📅</button>
          <button className="nav-link">⚙️</button>
        </div>
      </nav>
    </div>
  );
}

export default App;