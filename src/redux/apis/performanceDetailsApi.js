import API from '../../API/API.js';
const api = new API();
const endPoints = 'performance_appreciation';

export const createPerformanceDetailsApi = async (users) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await api.post(`${endPoints}`, users);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
export const loadPerformanceDetailsApi = async (pageno) => {
  return new Promise(async (resolve, reject) => {
    var body = {
      page: pageno,
      isMultipart: true
    }
    try {
      const result = await api.get(`${endPoints}`,body);
      resolve(result);
    } catch (error) {
      console.error('Error in loadLeaveBankApi:', error); // Log the error for debugging
      reject(error);
    }
  });
};
export const updatePerformanceDetailsApi = async (userId,userInfo) => {
  userInfo = {
    isMultipart: true,
    ...userInfo.values
  }
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.put(`${endPoints}/${userId}`, userInfo);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
