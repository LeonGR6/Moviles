import axios from 'axios';

const clientAxios = axios.create({
    
    baseURL: 'http://localhost:8888/Moviles/SubstanceTwins/public/',
    headers:{
        'Content-Type':'application/json',
        'X-Requested-With':'XMLHttpRequest'
    }, 
    withCredentials:true,
})

export default clientAxios