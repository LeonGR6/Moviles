import React, { useState, useEffect, createContext } from 'react'
import clientAxios from '../config/axios';
import { useAuth } from "../auth/context";



const SubstanceContext = createContext();


const SubstanceProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [actualCategory, setActualCategory] = useState({});
    const [product, setProduct] = useState({});
    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(0);
    const { user } = useAuth();



    useEffect(() => {
        const newTotal = order.reduce((total, product) => (product.price * product.quantity) + total, 0)
        setTotal(Number(newTotal.toFixed(2)))
    }, [order])



    //call to the api to get the categories
    const getCategories = async () => {
        try {
            const { data } = await clientAxios('/api/categories')
            setCategories(data.data)
            setActualCategory(data.data[0])


        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getCategories();
    }, [])




    //function to open/close the product modal
    const handleClickModal = () => {
        setModal(!modal)
    }

    //Function to filter product to the modal
    const handleSetProduct = product => {
        setProduct(product)
    }

    //function to add to the cart
    const handleAddOrder = ({ category_id, description, ...product }) => {
        if (order.some(orderState => orderState.id === product.id)) {
            const orderUpdate = order.map(orderState => orderState.id === product.id ? product : orderState)
            setOrder(orderUpdate)
        } else {
            setOrder([...order, product])
        }

    }

    //function to change category in the bottom nav
    const handleClickCategory = id => {
        const category = categories.filter(category => category.id === id)[0]
        setActualCategory(category)

    }

    const handleEditQuantity = id => {
        const productUpdate = order.filter(product => product.id === id)[0]
        setProduct(productUpdate);
        setModal(!modal);
    }
    const handleDeleteProductCart = id => {
        const orderUpdate = order.filter(product => product.id !== id)
        setOrder(orderUpdate);
    }
    const SubmitNewOrder = async () => {
        if (user?.accessToken) {
            const accessToken = user.accessToken;
            try {
                await clientAxios.post('/api/orders',
                    {
                        total,
                        products: order.map(product=>{
                            return{
                                id: product.id,
                                quantity: product.quantity
                            }
                        })
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken
                        }
                    })
                    setOrder([])
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('El objeto user es null');
        }

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
                handleClickModal,
                clearCategory,
                order,
                product,
                handleSetProduct,
                modal,
                handleAddOrder,
                handleEditQuantity,
                handleDeleteProductCart,
                total,
                SubmitNewOrder,
            }}


        >{children}</SubstanceContext.Provider>
    )
}
export {
    SubstanceProvider
}
export default SubstanceContext




