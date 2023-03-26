import api from "./api";

const savingsService = {
    getAllSavings: async (page = 1, search='', filter={}) => {
        try{
            const response = await api.get(`${apiUrl}/savings/?page=${page}`,{
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
            console.error('Error fetching savings', error);
            return {error: 'Error fetching savings'};
        }
    },
    createSavings: async (data) => {
        try{
            const response = await api.post("/savings", data);
            return response.data;
        } catch (error){
            console.error('Error creating savings', error);
            return {error: 'Error creating savings'};
        }
    },
    updateSavings: async (id, data) => {
        try{
            const response = await api.put(`/savings/${id}`, data);
            return response.data;
        } catch (error){
            console.error('Error updating savings', error);
            return {error: 'Error updating savings'};
        }
    },
    deleteSavings: async (id) => {
        try{
            const response = await api.delete(`/savings/${id}`);
            return response.data;
        } catch (error){
            console.error('Error deleting savings', error);
            return {error: 'Error deleting savings'};
        }
    },
};

export default savingsService;