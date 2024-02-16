import API from '../../API/API.js';
const api = new API();
const endPoints = '/attendances/monthly_status';
export const loadMonthlyAttendenceListDetailsApi = async (usermonth) => {
  return new Promise(async (resolve, reject) => {
      try {
        var body = {
            month: usermonth,
            isMultipart: true
          }
        const result = await api.get(`${endPoints}`,body);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
