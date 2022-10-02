import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]); 

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((resp) => resp.json())
      .then((transc) => {
        setTransactions(transc);
      });
  }, []);

  function handleUpdate(newTransaction) {
    const serverOptions = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    };

    fetch("http://localhost:8001/transactions", serverOptions) 
      .then((resp) => resp.json())
      .then((newItem) =>
        setTransactions((transactions) => [...transactions, newItem])
      );
  }

  function handleSearching(search) {
    setTransactions((transactions) =>
      transactions.filter((transaction) =>
        transaction.description.includes(search)
      )
    );
  }

  return (
    <div>
      <Search onSearching={handleSearching} />
      <AddTransactionForm onSubmission={handleUpdate} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;
