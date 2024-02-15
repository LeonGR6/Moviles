import React, { useState, useEffect, createContext } from 'react'
import clientAxios from '../config/axios';


const SubstanceContext = createContext();


const SubstanceProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [actualCategory, setActualCategory] = useState({});

    const getCategories = async()=>{
        try {
            const {data} = await clientAxios('/api/categories')
            setCategories(data.data)
            setActualCategory(data.data[0])


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {  
      getCategories();
    },[])
    
   
    const handleClickCategory = id => {
        const category = categories.filter(category => category.id === id)[0]
        setActualCategory(category)

    }
    
    const clearCategory = () => {
        setActualCategory([]);
      };



    return (
        <SubstanceContext.Provider

            value={{
                categories,
                actualCategory,
                handleClickCategory,
                clearCategory,
            }}


        >{children}</SubstanceContext.Provider>
    )
}
export {
    SubstanceProvider
}
export default SubstanceContext



 
