import API from '../../API/API.js';
const api = new API();
const endPoints = '/all_users_previous_month_totals';
const endPointsOne = 'user_daily_status';
export const loadMonthlyDetailsApi = async (usermonth) => {
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
