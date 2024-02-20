import axios from 'axios';

const clientAxios = axios.create({
    
    baseURL: 'http://localhost/Multiplataforma_Proyecto/Moviles/SubstanceTwins/public/',
    headers:{
        'Content-Type':'application/json',
        'X-Requested-With':'XMLHttpRequest'
    }, 
    withCredentials:true,
})

export default clientAxios