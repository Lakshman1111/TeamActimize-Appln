import API from '../../API/API.js';
const api = new API();
const endPoints = '/attendances';
export const createAttendenceListDetailsApi = async (updatedData) => {
  return new Promise(async (resolve, reject) => {
      try {
      const result = await api.post(`${endPoints}`,updatedData);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const loadAttendenceListDetailsApi = async (usermonth) => {
  return new Promise(async (resolve, reject) => {
   let  date = new Date(usermonth);
    date.setDate(date.getDate() + 1);
      try {
        var body = {
            date: date,
            isMultipart: true
          }
        const result = await api.get(`${endPoints}`,body);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const updateAttendenceListDetailsApi = async (updatedData,anyid) => {
  return new Promise(async (resolve, reject) => {
      try {
      const result = await api.put(`${endPoints}/${anyid}`,updatedData);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}