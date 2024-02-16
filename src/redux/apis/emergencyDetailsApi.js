import API from '../../API/API.js';
const api = new API();
const endPoints = 'emergency_details';
export const createEmergencyDetailsApi = async (users) => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.post(`${endPoints}`,users);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const loadEmergencyDetailsApi = async () => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.get(`${endPoints}`);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const deleteEmergencyDetailsApi = async (userId) => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.delete(`${endPoints}/${userId}`);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const updateEmergencyDetailsApi = async (userId,userInfo) => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.put(`${endPoints}/${userId}`,userInfo);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}


