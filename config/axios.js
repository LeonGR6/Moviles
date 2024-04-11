import axios from 'axios';

const clientAxios = axios.create({
    
    baseURL: 'http://192.168.0.15:8888/BACKEND-SUBSTANCETWINS/public/',
    headers:{
        'Content-Type':'application/json',
        'X-Requested-With':'XMLHttpRequest'
    }, 
    withCredentials:true,
})

export default clientAxios