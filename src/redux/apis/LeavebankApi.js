import API from '../../API/API.js';
const api = new API();
const endPoints = 'leave_bank';
const endPointsone = 'all_leave_banks';
export const createLeaveBankApi = async (users) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await api.post(`${endPoints}`, users);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
export const loadLeaveBankApi = async (pageno) => {
  return new Promise(async (resolve, reject) => {
    var body = {
      page: pageno,
      isMultipart: true
    }
    try {
      const result = await api.get(`${endPointsone}`,body);
      resolve(result);
    } catch (error) {
      console.error('Error in loadLeaveBankApi:', error); 
      reject(error);
    }
  });
};
export const updateLeaveBankApi = async (userId, userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.put(`${endPoints}/${userId}`, userInfo);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
export const deleteLeaveBankApi = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoints}/${userId}`);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}




