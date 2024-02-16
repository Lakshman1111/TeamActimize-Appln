import API from '../../API/API.js';
const api = new API();
const endPoints = 'users';
export const createExpertCreationApi = async (users) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await api.post(`${endPoints}`, users);
        resolve(result);
      } catch (error) {
        console.error('API Error-------------------:', error); 
        reject(error);
      }
    });
  }




