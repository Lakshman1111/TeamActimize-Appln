import API from '../../API/API.js';
const api = new API();
const endPoints = 'birthdays';
export const loadBirthdayDetailsApi = async (pageno) => {
  return new Promise(async (resolve, reject) => {
    var body = {
      page: pageno,
      isMultipart: true
    }
      try {
        const result = await api.get(`${endPoints}`,body);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}



