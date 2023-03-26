import React, { useState, useEffect } from "react";
import savingsService from "../services/savingsService";
import SavingForm from "../components/SavingForm";
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

const Savings = () => {
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const fetchSavings = async () => {
      setLoading(true);
      const response = await savingsService.getAllSavings(page, search, filter);
      if (response.error) {
        setError(response.error);
      } else {
        setSavings(response.data.results);
        setTotalPages(response.data.total_pages);
      }
      setLoading(false);
    };
    fetchSavings();
  }, [page, search, filter]);

  // Update the search state when the search input changes
const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  
  // Update the filter state when a filter is applied
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const handleCreateSaving = async (values, { setSubmitting, resetForm }) => {
    const newSaving = await savingsService.createSavings(values);
    if (!newSaving.error) {
      setSavings((prevSavings) => [...prevSavings, newSaving]);
      resetForm();
    }
    setSubmitting(false);
  };
  const handleUpdateSaving = async (values, { setSubmitting }) => {
    const updatedSaving = await savingsService.updateSavings(values);
    if (!updatedSaving.error) {
      setSavings((prevSavings) =>
        prevSavings.map((saving) =>
          saving.id === updatedSaving.id ? updatedSaving : saving
        )
      );
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="md">
    <Fade in={!loading && !error} timeout={500}>
<Box my={4}>
    <Typography variant="h4" align="center">Savings</Typography>
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
        <Typography>Loading savings...</Typography>
    ) : error ? (
        <Typography>Error: {error}</Typography>
    ) : (
        <>
        <List>
            {savings.map((saving) => (
                <ListItem key={saving.id}>
                    {saving.name}: ${saving.amount}
                </ListItem>
            ))}
        </List>
        <Box display="flex" justifyContent="space-between" my={2}>
            <Button variant="contained" disabled={page === 1} onClick={() => setPage((prevPage)=>prevPage-1)}>Previous</Button>
            <Typography>Page {page} of {totalPages}</Typography>
            <Button variant="contained" disabled={page === totalPages} onClick={() => setPage((prevPage)=>prevPage+1)}>Next</Button>
        </Box>
        <Box my={4}>
    <Typography variant="h5">Create Savings</Typography>
          <SavingForm
            initialValues={{ name: "", amount: "" }}
            onSubmit={handleCreateSaving}
            buttonText="Create Saving"
          />
    <Typography variant="h5">Update Savings</Typography>
          <SavingForm
            initialValues={{ id: "", name: "", amount: "" }}
            onSubmit={handleUpdateSaving}
            buttonText="Update Saving"
          />
    </Box>
    </>
    )}
    </Paper>
    </Container>
  );
};

export default Savings;
