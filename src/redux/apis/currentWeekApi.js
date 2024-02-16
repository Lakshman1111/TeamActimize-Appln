import API from '../../API/API.js';
const api = new API();
const endPoints = 'hours_entry/current_week';
export const currentWeekApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoints}`);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
  

  