import API from '../../API/API.js';
const api = new API();
const endPoints = 'user_profiles';
export const loadAllExpertsApi = async (pageno) => {
  var body = {
    page: pageno,
    isMultipart: true
  }
    return new Promise(async (resolve, reject) => {
      try {
        const result = await api.get(`${endPoints}`,body);
        resolve(result);
      } catch (error) {
        console.error('Error in loadAllExpertsApi:', error); 
        reject(error);
      }
    });
  };