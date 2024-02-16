import API from '../../API/API.js';
const api = new API();
const endPoints = 'hours_entry';
export const createHoursEntryDetailsApi = async (users) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await api.post(`${endPoints}`, users);
            resolve(result);
        } catch (error) {
            reject(error);
        }});
}
export const loadHoursEntryDetailsApi = async () => {
    return new Promise(async (resolve, reject) => {
        try {
          const result = await api.get(`${endPoints}`);
          resolve(result);
        } catch(error) {
          reject(error);
        }
      });
  }
  export const updateHoursEntryApi = async (userId,updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
          const result = await api.put(`${endPoints}/${userId}`,updatedData);
          resolve(result);
        } catch(error) {
          reject(error);
        }
      });
  }