import axios from 'axios';
export const base = 'http://172.81.214.190:3007';
// export const base = 'http://localhost:3007';
export const adminBase = 'http://172.81.214.190:3007/admin';
export const uploadUrl = 'http://172.81.214.190:3007/admin/upload/image';
export const imageBaseUrl = 'http://172.81.214.190:3007';

// admin
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const adminLogin = params => { return axios.post(`${adminBase}/login`, params).then(res => res.data); };
export const adminRegister = params => { return axios.post(`${adminBase}/register`, params).then(res => res.data); };



export const getUserList = params => { return axios.post(`${adminBase}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.post(`${adminBase}/user/listpage`, { params: params }); };
export const getClubListPage = params => { return axios.post(`${adminBase}/club/listpage`, { params: params }); };
export const addClub = params => { return axios.post(`${adminBase}/club/add`, { params: params }); };
export const optClub = params => { return axios.post(`${adminBase}/opt`, { params: params }); };

export const getActiveListPage = params => { return axios.post(`${adminBase}/active/listpage`, { params: params }); };
export const addActive = params => { return axios.post(`${adminBase}/active/add`, { params: params }); };
export const getApplyListPage = params => { return axios.post(`${adminBase}/apply/listpage`, { params: params }); };
export const passApply = params => { return axios.post(`${adminBase}/apply/pass`, { params: params }); };


export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//user 
export const getClubBanner = params => { return axios.post(`${base}/clubBanner/list`, { params: params }); };
export const getClubList = params => { return axios.post(`${base}/club/list`, { params: params }); };
export const applyClub = params => { return axios.post(`${base}/club/apply`, { params: params }); };
export const getUserClubList = params => { return axios.post(`${base}/club/userList`, { params: params }); };
export const getClubDetail = params => { return axios.post(`${base}/club/detail`, { params: params }); };
export const getActiveList = params => { return axios.post(`${base}/active/list`, { params: params }); };
export const sendMessage = params => { return axios.post(`${base}/message/add`, { params: params }); };
export const getMessageList = params => { return axios.post(`${base}/message/list`, { params: params }); };

// word
export const getUserwordList = params => { return axios.post(`${base}/word/list`, { params: params }); };
export const getallwordList = params => { return axios.post(`${base}/word/all`, { params: params }); };
export const addword = params => { return axios.post(`${base}/word/add`, { params: params }); };
export const optWord = params => { return axios.post(`${base}/word/opt`, { params: params }); };
export const optMyWord = params => { return axios.post(`${base}/word/myopt`, { params: params }); };
export const changeOrder = params => { return axios.post(`${base}/word/order`, { params: params }); };
export const exportWord = params => { return axios.get(`${base}/word/export`, { params: params,responseType:'blob' }); };

// 词组
export const getUserwordGroupList = params => { return axios.post(`${base}/wordGroup/list`, { params: params }); };
export const getallwordGroupList = params => { return axios.post(`${base}/wordGroup/all`, { params: params }); };
export const addwordGroup = params => { return axios.post(`${base}/wordGroup/add`, { params: params }); };
export const optWordGroup = params => { return axios.post(`${base}/wordGroup/opt`, { params: params }); };
export const optMyWordGroup = params => { return axios.post(`${base}/wordGroup/myopt`, { params: params }); };

// test

export const gettestwordList = params => { return axios.post(`${base}/word/test`, { params: params }); };

// 体重记录

export const getfitnessList = params => { return axios.post(`${base}/word/fitness`, { params: params }); };
export const fitnessadd = params => { return axios.post(`${base}/word/fitnessadd`, { params: params }); };










