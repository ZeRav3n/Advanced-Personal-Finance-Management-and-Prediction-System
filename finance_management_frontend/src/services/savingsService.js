import api from "./api";

const savingsService = {
    getAllSavings: async () => {
        try{
            const response = await api.get("/savings");
            return response.data;
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