import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: form,
    });

    console.log(res);
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
    </div>
  );
}

export default App;
