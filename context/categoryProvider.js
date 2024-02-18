import React, { useState, useEffect, createContext } from 'react'
import clientAxios from '../config/axios';


const SubstanceContext = createContext();


const SubstanceProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [actualCategory, setActualCategory] = useState({});
    const [product, setProduct] = useState({});
    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState([]);



    //call to the api to get the categories
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


    //Function to filter product to the modal
    const handleSetProduct = product => {
        setProduct(product)
    }

//function to open/close the product modal
    const handleClickModal = () => {
        setModal(!modal)
    }

    //function to add to the cart
    const handleAddOrder = ({ category_id, description, ...product }) => {
        if (order.some(orderState => orderState.id === product.id)) {
            const orderUpdate = order.map(orderState => orderState.id === product.id ? product : orderState)
            setOrder(orderUpdate)
            toast.success("The product was modified correctly!", {
                theme: "dark",
            })

        } else {
            setOrder([...order, product])
            toast.success("The product was added!", {
                theme: "dark",
            })
        }

    }
    
   //function to change category in the bottom nav
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
                modal,
                handleClickModal,
                product,
                handleSetProduct,
                handleAddOrder,
                order,
            }}


        >{children}</SubstanceContext.Provider>
    )
}
export {
    SubstanceProvider
}
export default SubstanceContext



 
