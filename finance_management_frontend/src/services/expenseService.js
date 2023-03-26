import api from "./api";

const expenseService = {
    getAllExpenses: async () => {
        try{
            const response = await api.get("/expenses");
            return {data: response.data};
        } catch (error){
            console.error('Error fetching expenses', error);
            return {error: 'Error fetching expenses'};
        }
    },
    createExpnse: async (data) => {
        try{
            const response = await api.post("/expenses", data);
            return {data: response.data};
        } catch (error){
            console.error('Error creating expense', error);
            return {error: 'Error creating expense'};
        }
    },
    updateExpense: async (id, data) => {
        try{
            const response = await api.put(`/expenses/${id}`, data);
            return {data: response.data};
        } catch (error){
            console.error('Error updating expense', error);
            return {error: 'Error updating expense'};
        }
    },
    deleteExpense: async (id) => {
        try{
            const response = await api.delete(`/expenses/${id}`);
            return {data: response.data};
        } catch (error){
            console.error('Error deleting expense', error);
            return {error: 'Error deleting expense'};
        }
    },
};

export default expenseService;