import API from '../../API/API.js';
const api = new API();
const endPoints = 'all_users_previous_weeks_totals';
const endPointsOne = 'user_daily_status';
export const loadWeeklyDetailsApi = async (pageno) => {
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
  export const loadWeeklySelectDetailsApi = async (username,weekdate) => {
      return new Promise(async (resolve, reject) => {
          try {
            var body = {
              name: username,
              start_date: weekdate,
              isMultipart: true
            }
            const result = await api.get(`${endPointsOne}`, body);
            resolve(result);
          } catch(error) {
            reject(error);
          }
        });
    }