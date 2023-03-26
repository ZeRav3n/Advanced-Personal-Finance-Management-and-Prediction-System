import api from "./api";

const investmentService = {
    getAllInvestments: async (page = 1, search='', filter={}) => {
        try{
            const response = await api.get(`${apiUrl}/investments/?page=${page}`,{
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
            return {data: response.data};
        } catch (error){
            console.error('Error fetching investments', error);
            return {error: 'Error fetching investments'};
        }
    },
    createInvestment: async (data) => {
        try{
            const response = await api.post("/investments", data);
            return {data: response.data};
        } catch (error){
            console.error('Error creating investment', error);
            return {error: 'Error creating investment'};
        }
    },
    updateInvestment: async (id, data) => {
        try{
            const response = await api.put(`/investments/${id}`, data);
            return {data: response.data};
        } catch (error){
            console.error('Error updating investment', error);
            return {error: 'Error updating investment'};
        }
    },
    deleteInvestment: async (id) => {
        try{
            const response = await api.delete(`/investments/${id}`);
            return {data: response.data};
        } catch (error){
            console.error('Error deleting investment', error);
            return {error: 'Error deleting investment'};
        }
    },
};

export default investmentService;