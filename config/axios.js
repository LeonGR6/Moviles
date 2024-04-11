import axios from 'axios';

const clientAxios = axios.create({
    
    baseURL: 'http://172.20.10.10:8888/BACKEND-SUBSTANCETWINS/public/',
    headers:{
        'Content-Type':'application/json',
        'X-Requested-With':'XMLHttpRequest'
    }, 
    withCredentials:true,
})

export default clientAxios