import { useState, useEffect } from "react";
import "./App.css";

const initialForm = {
  amount: 0,
  description: "",
  date: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    console.log("🚀 ~ file: App.js ~ line 19 ~ fetchTransactions ~ data", data);
    setTransactions(data);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.ok) {
      setForm(initialForm);
      fetchTransactions();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={form.amount}
          name="amount"
          type="number"
          placeholder="enter transaction amount"
          onChange={handleInput}
        />
        <input
          name="description"
          value={form.description}
          type="text"
          placeholder="enter Transaction details"
          onChange={handleInput}
        />
        <input
          onChange={handleInput}
          name="date"
          value={form.date}
          type="date"
        />
        <button type="submit">Submit</button>
      </form>

      <br />
      <section>
        <table>
          <thead>
            <th>Amount</th>
            <th>description</th>
            <th>Date</th>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr key={trx._id}>
                <td>{trx.amount}</td>
                <td>{trx.description}</td>
                <td>{trx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
