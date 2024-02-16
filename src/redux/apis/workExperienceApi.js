import API from '../../API/API.js';
const api = new API();
const endPoints = 'work_experiences';
export const createWorkExpDetailsApi = async (users) => {
  return new Promise(async (resolve, reject) => {
      try {
      const result = await api.post(`${endPoints}`,users);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const loadWorkExpDetailsApi = async () => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.get(`${endPoints}`);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const deleteWorkExpDetailsApi = async (userId) => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.delete(`${endPoints}/${userId}`);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const updateWorkExpDetailsApi = async (userId,userInfo) => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.put(`${endPoints}/${userId}`,userInfo);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}


