import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
export let getData =  ()=> {
  return axios.get('/datas')
};
export let getFlowChart =  ()=> {
  return axios.get('/getFlowChart')
};
export let getJsplumbData =  ()=> {
  return axios.get('/getJsplumbData')
};
export let getGo2 =  ()=> {
  return axios.get('/getGo2')
};
export let getMxgraph =  ()=> {
  return axios.get('/getMxgraph')
};
export let getG6 =  ()=> {
  return axios.get('/getMxgraph')
};



