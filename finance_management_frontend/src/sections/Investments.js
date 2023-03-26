import React, {useState, useEffect} from "react";
import investmentService from "../services/investmentService";
import InvestmentForm from "../components/InvestmentForm";
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

const Investments = () => {
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({});

    useEffect(() => {
        const fetchInvestments = async () => {
            setLoading(true);
            const response = await investmentService.getAllInvestments(page, search, filter);
            if (response.error) {
                setError(response.error);
            } else {
                setInvestments(response.data.results);
                setTotalPages(response.data.total_pages);
            }
            setLoading(false);
        };
        fetchInvestments();
    }, [page, search, filter]);

    // Update the search state when the search input changes
const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  
  // Update the filter state when a filter is applied
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
    const handleCreateInvestment = async (values, {setSubmitting, resetForm}) => {
        const newInvestment = await investmentService.createInvestment(values);
        if(!newInvestment.error) {
            setInvestments((prevInvestments) => [...prevInvestments, newInvestment]);
            resetForm();
        }
        setSubmitting(false);
    };
    const handleUpdateInvestment = async (values, {setSubmitting}) => {
        const updatedInvestment = await investmentService.updateInvestment(values);
        if(!updatedInvestment.error) {
            setInvestments((prevInvestments) =>
                prevInvestments.map((investment) =>
                    investment.id === updatedInvestment.id ? updatedInvestment : investment
                )
            );
        }
        setSubmitting(false);
    };

    return(
        <Container maxWidth="md">
            <Fade in={!loading && !error} timeout={500}>
        <Box my={4}>
            <Typography variant="h4" align="center">Investments</Typography>
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
                <Typography>Loading investments...</Typography>
            ) : error ? (
                <Typography>Error: {error}</Typography>
            ) : (
                <>
                <List>
                    {investments.map((investment) => (
                        <ListItem key={investment.id}>
                            {investment.name}: ${investment.amount}
                        </ListItem>
                    ))}
                </List>
                <Box display="flex" justifyContent="space-between" my={2}>
                    <Button variant="contained" disabled={page === 1} onClick={() => setPage((prevPage)=>prevPage-1)}>Previous</Button>
                    <Typography>Page {page} of {totalPages}</Typography>
                    <Button variant="contained" disabled={page === totalPages} onClick={() => setPage((prevPage)=>prevPage+1)}>Next</Button>
                </Box>
                <Box my={4}>
            <Typography variant="h5">Create Investment</Typography>
            <InvestmentForm
                initialValues={{
                    name: '',
                    amount: 0,
                }}
                onSubmit={handleCreateInvestment}
                buttonText="Create Investment"
            />
            <Typography variant="h5">Update Investment</Typography>
            <InvestmentForm
                initialValues={{
                    id: '',
                    name: '',
                    amount: 0,
                }}
                onSubmit={handleUpdateInvestment}
                buttonText="Update Investment"
            />
            </Box>
            </>
            )}
            </Paper>
        </Container>
    );
};

export default Investments;