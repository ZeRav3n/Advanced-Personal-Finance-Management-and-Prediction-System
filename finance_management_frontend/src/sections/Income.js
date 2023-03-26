import React, {useState, useEffect} from "react";
import incomeService from "../services/incomeService";
import IncomeForm from "../components/IncomeForm";
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

const Income = () => {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({});

    useEffect(() => {
        const fetchIncomes = async () => {
            setLoading(true);
            const response = await incomeService.getAllIncomes(page, search, filter);
            if (response.error) {
                setError(response.error);
            } else {
                setIncomes(response.data.results);
                setTotalPages(response.data.total_pages);
            }
            setLoading(false);
        };
        fetchIncomes();
    }, [page, search, filter]);
    
    // Update the search state when the search input changes
const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  
  // Update the filter state when a filter is applied
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
    const handleCreateIncome = async (values, {setSubmitting, resetForm}) => {
        const newIncome = await incomeService.createIncome(values);
        if(!newIncome.error) {
            setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
            resetForm();
        }
        setSubmitting(false);
    };
    const handleUpdateIncome = async (values, {setSubmitting}) => {
        const updatedIncome = await incomeService.updateIncome(values);
        if(!updatedIncome.error) {
            setIncomes((prevIncomes) =>
                prevIncomes.map((income) => 
                    income.id === updatedIncome.id ? updatedIncome : income
                )
            );
        }
        setSubmitting(false);
    };

    return(
        <Container maxWidth="md">
            <Fade in={!loading && !error} timeout={500}>
        <Box my={4}>
            <Typography variant="h4" align="center">Income</Typography>
            </Box>
            </Fade>
            <Paper elevation={3} sx={{ padding: 2 }}>
            <Box display="flex" justifyContent="space-between" my={2}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          label="Filter by Date"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="week">This Week</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
        </TextField>
      </Box>
            {loading ? (
                <Typography>Loading incomes...</Typography>
            ) : error ? (
                <Typography>Error: {error}</Typography>
            ) : (
                <>
                <List>
                    {incomes.map((income) => (
                        <ListItem key={income.id}>
                            {income.name}: ${income.amount}
                        </ListItem>
                    ))}
                </List>
                <Box display="flex" justifyContent="space-between" my={2}>
                    <Button variant="contained" disabled={page === 1} onClick={() => setPage((prevPage)=>prevPage-1)}>Previous</Button>
                    <Typography>Page {page} of {totalPages}</Typography>
                    <Button variant="contained" disabled={page === totalPages} onClick={() => setPage((prevPage)=>prevPage+1)}>Next</Button>
                </Box>
                <Box my={4}>
            <Typography variant="h5">Create Income</Typography>
            <IncomeForm
                initialValues={{
                    name: '',
                    amount: '',
                }}
                onSubmit={handleCreateIncome}
                buttonText="Create Income"
            /></Box>
            <Box my={4}>
            <Typography variant="h5">Update Income</Typography>
            <IncomeForm
                initialValues={{
                    id: '',
                    name: '',
                    amount: '',
                }}
                onSubmit={handleUpdateIncome}
                buttonText="Update Income"
            />
            </Box>
            </>
            )}
        </Paper>
        </Container>
    );
};

export default Income;