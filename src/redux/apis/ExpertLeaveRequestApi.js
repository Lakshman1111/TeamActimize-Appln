import API from '../../API/API.js';
const api = new API();
const endPoints = 'leaves';
const endPointsone = 'leaves_all';
export const createLeaveRequestDetailsApi = async (users) => {
  return new Promise(async (resolve, reject) => {
      try {
      const result = await api.post(`${endPoints}`,users);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const loadLeaveRequestDetailsApi = async (pageno) => {
  return new Promise(async (resolve, reject) => {
    var body = {
      page: pageno,
      isMultipart: true
    }
      try {
        const result = await api.get(`${endPointsone}`,body);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const updateLeaveRequestDetailsApi = async (userId,userInfo) => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.put(`${endPoints}/${userId}/approve`,userInfo);
        resolve(result);  
      } catch(error) {
        reject(error);
      }
    });
}


