import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
let getData =  ()=> {
  return axios.get('/datas')
};

export let getActivityCenterData =  ()=> {
  return axios.get('/getActivityCenterData')
};
export {getData}


