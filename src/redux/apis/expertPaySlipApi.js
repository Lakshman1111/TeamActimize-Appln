import API from '../../API/API.js';

const api = new API();
const endPoints = 'taxes';
export const createPaySlipDetailsApi = async (users) => {
  try {
    const result = await api.post(`${endPoints}`, users); 
    const apiResultVariable = result; 
    return apiResultVariable; 
  } catch (error) {
    console.error('API Post Error:', error);
    throw error;
  }
};