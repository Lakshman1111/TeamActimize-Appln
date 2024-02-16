
import API from '../../API/API.js';
const api = new API();
const endPoints = 'personal_details';
  export const getUserApi = async () => {
      return new Promise(async (resolve, reject) => {
          try {
            const result = await api.get(`${endPoints}`);                                                           
            resolve(result);
          } catch(error) {
            reject(error);
          }
        });
  }
  

  