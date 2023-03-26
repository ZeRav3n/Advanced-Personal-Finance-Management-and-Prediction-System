import api from "./api";

const incomeService = {
    getAllIncomes: async (page = 1, search='', filter={}) => {
        try{
            const response = await api.get(`${apiUrl}/incomes/?page=${page}`,{
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                params: {
                    page: page,
                    search: search,
                    date: filter.date,
                    category: filter.category,
                    amount: filter.amount,
                },
                });
            return {data:response.data};
        } catch (error){
            console.error('Error fetching incomes', error);
            return {error: 'Error fetching incomes'};
        }
    },
    createIncome: async (data) => {
        try{
            const response = await api.post("/incomes", data);
            return response.data;
        } catch (error){
            console.error('Error creating income', error);
            return {error: 'Error creating income'};
        }
    },
    updateIncome: async (id, data) => {
        try{
            const response = await api.put(`/incomes/${id}`, data);
            return response.data;
        } catch (error){
            console.error('Error updating income', error);
            return {error: 'Error updating income'};
        }
    },
    deleteIncome: async (id) => {
        try{
            const response = await api.delete(`/incomes/${id}`);
            return response.data;
        } catch (error){
            console.error('Error deleting income', error);
            return {error: 'Error deleting income'};
        }
    },
};

export default incomeService;