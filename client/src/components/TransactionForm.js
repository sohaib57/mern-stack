import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Container } from "@mui/system";
import { create } from "@mui/material/styles/createTransitions";

const initialForm = {
  amount: 0,
  description: "",
  date: new Date(),
};

export default function TransactionForm({
  fetchTransactions,
  editTransaction,
}) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDate = (newValue) => {
    setForm({ ...form, date: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = editTransaction.amount === undefined ? create() : update();

    async function create() {
      const res = await fetch("http://localhost:4000/transaction", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-type": "application/json",
        },
      });
      reload(res);
    }

    async function update() {
      const res = await fetch(
        `http://localhost:4000/transaction/${editTransaction._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(form),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      reload(res);
    }

    async function reload(res) {
      if (res.ok) {
        setForm(initialForm)
        fetchTransactions();
      }
    }
  };

  return (
    <Container>
      <Card sx={{ minWidth: 275, marginTop: 10 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6">Add new Transaction</Typography>
            <TextField
              sx={{ marginRight: 5 }}
              size="small"
              id="outlined-basic"
              label="amount"
              variant="outlined"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />
            <TextField
              sx={{ marginRight: 5 }}
              name="description"
              size="small"
              id="outlined-basic"
              label="description"
              variant="outlined"
              value={form.description}
              onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Transaction date"
                inputFormat="MM/DD/YYYY"
                name="date"
                value={form.date}
                onChange={handleDate}
                renderInput={(params) => (
                  <TextField size="small" sx={{ marginRight: 5 }} {...params} />
                )}
              />
            </LocalizationProvider>

            {editTransaction.amount !== undefined && (
              <Button variant="contained" type="secondary">
                Update
              </Button>
            )}

            {editTransaction.amount === undefined && (
              <Button variant="contained" type="submit">
                Submit
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
