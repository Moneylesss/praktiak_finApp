import React from 'react';

const Dashboard = ({ accounts, transactions }) => {
  const totalBalance = accounts.reduce((sum, acc) => sum
