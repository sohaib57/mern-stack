import React from "react";
import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm.js";
import TransactionsList from "../components/TransactionsList";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  };
  return (
    <Container>
      <TransactionForm
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
      />
      <TransactionsList
        transactions={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
};

export default Home;
