import React, { useState, useEffect } from "react";
import expenseService from "../services/expenseService";
import ExpenseForm from "../components/ExpenseForm";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  Box,
  Paper,
  Fade,
  Slide
} from "@mui/material";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      const response = await expenseService.getAllExpenses(page);

      if (response.error) {
        setError(response.error);
      } else {
        setExpenses(response.data.results);
        setTotalPages(response.data.total_pages);
      }

      setLoading(false);
    };

    fetchExpenses();
  }, [page]);

  const handleCreateExpense = async (values, { setSubmitting, resetForm }) => {
    const newExpense = await expenseService.createExpense(values);
    if (newExpense.error) {
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      resetForm();
    }
    setSubmitting(false);
  };

  const handleUpdateExpense = async (values, { setSubmitting }) => {
    const updatedExpense = await expenseService.updateExpense(values);
    if (!updatedExpense.error) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        )
      );
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="md">
        <Fade in={!loading && !error} timeout={500}>
      <Box my={4}>
        <Typography variant="h4" align="center">
          Expenses
        </Typography>
      </Box></Fade>
      <Paper elevation={3} sx={{ padding: 2 }}>
        {loading ? (
          <Typography>Loading expenses...</Typography>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : (
          <>
            <List>
              {expenses.map((expense) => (
                <ListItem key={expense.id}>
                  {expense.name}: ${expense.amount}
                </ListItem>
              ))}
            </List>
            <Box display="flex" justifyContent="space-between" my={2}>
              <Button
                variant="contained"
                disabled={page === 1}
                onClick={() => setPage((prevPage) => prevPage - 1)}
              >
                Previous
              </Button>
              <Typography>
                Page {page} of {totalPages}
              </Typography>
              <Button
                variant="contained"
                disabled={page === totalPages}
                onClick={() => setPage((prevPage) => prevPage + 1)}
              >
                Next
              </Button>
            </Box>
            <Box my={4}>
              <Typography variant="h5">Create Expense</Typography>
              <ExpenseForm
                initialValues={{ name: "", category: "", amount: "", date: "" }}
                onSubmit={handleCreateExpense}
                buttonText="Create Expense"
              />
            </Box>
            <Box my={4}>
              <Typography variant="h5">Update Expense</Typography>
              <ExpenseForm
                initialValues={{ name: "", category: "", amount: "", date: "" }}
                onSubmit={handleUpdateExpense}
                buttonText="Update Expense"
              />
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Expenses;
