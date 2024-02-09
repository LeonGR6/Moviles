import axios from 'axios';

const clientAxios = axios.create({
    
    baseURL: 'http://localhost/SubstanceTwins_Project/SubstanceTwins/public/',
    headers:{
        'Content-Type':'application/json',
        'X-Requested-With':'XMLHttpRequest'
    }, 
    withCredentials:true,
})

export default clientAxios