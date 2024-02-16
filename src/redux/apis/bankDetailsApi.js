import API from '../../API/API.js';
const api = new API();
const endPoints = 'bank_details';
export const createBankDetailsApi = async (users) => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.post(`${endPoints}`,users);
        resolve(result);
      } 
      catch(error) {
        reject(error);
      }
    });
}
export const loadBankDetailsApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(endPoints); // Assuming `endPoints` is a valid URL
      resolve(result);
    } catch (error) {
      console.error('Error in loadBankDetailsApi:', error); // Log the error for debugging
      reject(error);
    }
  });
};





