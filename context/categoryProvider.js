import React, { useState, useEffect, createContext } from 'react'
import clientAxios from '../config/axios';
import { useAuth } from "../auth/context";



const SubstanceContext = createContext();


const SubstanceProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [actualCategory, setActualCategory] = useState({});
    const [product, setProduct] = useState({});
    const [modal, setModal] = useState(false);
    const [modalAdmin, setModaladmin] = useState(false)
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(0);
    const [images, setImages] = useState({});
    const [showAlertDelete, setShowAlertDelete] = useState(false)
    const [showAlertEdit, setShowAlertEdit] = useState(false)
    const [showAlertCart, setShowAlertCart] = useState(false)
    const [showAlertOrders, setShowAlertOrders] = useState(false)
    const [orderStates, setOrderStates] = useState([]);
    const [actualOrderState, setActualOrderState] = useState({});
    const [orderUpdate, setOrderUpdate] = useState([]);




    const { user } = useAuth();



    useEffect(() => {
        const newTotal = order.reduce((total, product) => (product.price * product.quantity) + total, 0)
        setTotal(Number(newTotal.toFixed(2)))
    }, [order])



    /////////call to the api to get the categories///////////////////////
    const getCategories = async () => {
        try {
            const { data } = await clientAxios('/api/categories')
            setCategories(data.data)
            setActualCategory(null)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    const handleClickCategory = id => {
        try {
            const category = categories.filter(category => category.id === id)[0]
            setActualCategory(category)

        } catch (error) {
            console.log(error)
        }
    }
    const clearCategory = () => {
        setActualCategory(null);
    };
    //////////////////////////////////////

    ////////function to open/close the product modal////////
    const handleClickModal = () => {
        setModal(!modal)
    }


    //function to open/close the product modal an clear inputs in ADMIN
    const handleClickAdmin = () => {
        setModaladmin(!modalAdmin)
        clearInputs();
    }
    const clearInputs = () => {
        setNameEdit(null);
        setDescriptionEdit(null);
        setCategoryEdit(null);
        setPriceEdit(null);
        setImages({})
    }


    //Function to filter product to the modal
    const handleSetProduct = product => {
        setProduct(product)
    }

    //////function to add to the cart and other cart functions/////////////////
    const handleAddOrder = ({ category_id, description, ...product }) => {
        if (order.some(orderState => orderState.id === product.id)) {
            const orderUpdate = order.map(orderState => orderState.id === product.id ? product : orderState)
            setOrder(orderUpdate)
        } else {
            setOrder([...order, product])
        }

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
                        products: order.map(product => {
                            return {
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

    ////////////////////////////////////////////////






    /////////////FUNCTION TO INSERT PRODUCT ON TE BACKEND/////////////////////
    const insertProduct = async () => {
        const accessToken = user?.accessToken;

        if (accessToken) {
            try {
                const productData = {
                    name: nameEdit,
                    description: descriptionEdit,
                    price: priceEdit,
                    categories_id: categoryEdit,
                };

                if (images !== null && images.length > 0) {
                    const imagesBase64 = images.map(image => ({
                        name: image.name,
                        type: image.type,
                        uri: image.uri
                    }));

                    productData.images = imagesBase64;
                }

                await clientAxios.post(
                    `/api/product`,
                    productData,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                            'Content-Type': 'application/json',
                        }
                    }
                );


                handleClickAdmin();
            } catch (error) {
                console.log(error);
            }
        }
    };
    ///////////////////////////////////////////////////


    ///////////////EDIT PRODUCT ON ADMIN///////////////////
    const [nameEdit, setNameEdit] = useState('');
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [priceEdit, setPriceEdit] = useState('');
    const [categoryEdit, setCategoryEdit] = useState('');


    const getProduct = async (idP) => {
        const { data } = await clientAxios(`/api/products/${idP}`)
        console.log(data.product)
        const { name, description, price, categories_id } = data.product
        
        setNameEdit(name);
        setPriceEdit(price);
        setDescriptionEdit(description);
        setCategoryEdit(categories_id);
    }

    
    const updateProduct = async () => {
        if (user?.accessToken) {
            const accessToken = user.accessToken;
            try {
                const productData = {
                    name: nameEdit,
                    description: descriptionEdit,
                    price: priceEdit,
                    categories_id: categoryEdit,
                };

                if (images !== null && images.length > 0) {
                    const imagesBase64 = images.map(image => ({
                        name: image.name,
                        type: image.type,
                        uri: image.uri
                    }));

                    productData.images = imagesBase64;
                }

                await clientAxios.put(
                    `/api/product/${product.id}`,
                    productData,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                            'Content-Type': 'application/json',
                        }
                    }
                );


                handleClickAdmin();
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('El objeto user es null');
        }
    };
    ///////////////////////////////////////////////////

    /////////////FUNCTION TO DELETE PRODUCT ON TE BACKEND/////////////////////
    const deleteProduct = async (idP) => {
        const accessToken = user?.accessToken;

        if (accessToken) {
            try {
                await clientAxios.delete(
                    `/api/product/${idP}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                            'Content-Type': 'application/json',
                        }
                    }
                );
            } catch (error) {
                // Si hay un error al eliminar el producto, puedes manejarlo aquí
                console.error('Error deleting product:', error);
            }
        }
    };
    //////////////////////////////////////////////////////

    //call to the api to get the order states
    const getOrderStates = async () => {
        try {
            const { data } = await clientAxios('/api/orderstates')
            setOrderStates(data.data)
            setActualOrderState(null)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getOrderStates();
    }, [])

    const handleClickOrderState = id => {
        try {
            const state = orderStates.filter(state => state.id === id)[0]
            setActualOrderState(state)

        } catch (error) {
            console.log(error)
        }
    }


    const clearOrderState = () => {
        setActualOrderState(null);
    };

    //////////////////////////////////////////////////

    //////////////////////HANDLE STATUS OF ORDERS///////////////////////////
    const makeStatusCompleted = id => {
        const accessToken = user?.accessToken;

        if (accessToken) {
            try {
                clientAxios.put(`/api/orders/${id}`,
                    {
                        order_statuses_id: 3,
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }


    const makeStatusShipped = id => {
        const accessToken = user?.accessToken;
        if (accessToken) {
            try {
                clientAxios.put(`/api/orders/${id}`,
                    {
                        order_statuses_id: 2,
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }
    const deleteOrder = async (id) => {
        const accessToken = user?.accessToken;
        if (accessToken) {
            try {
                await clientAxios.delete(
                    `/api/orders/${id}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                            'Content-Type': 'application/json',
                        }
                    }
                );
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };
    ////////////////////////////////////////////////////////////


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
                handleClickAdmin,
                modalAdmin,
                setImages,
                images,
                updateProduct,
                nameEdit,
                setNameEdit,
                descriptionEdit,
                setDescriptionEdit,
                priceEdit,
                setPriceEdit,
                categoryEdit,
                setCategoryEdit,
                getProduct,
                deleteProduct,
                setShowAlertDelete,
                showAlertDelete,
                setShowAlertEdit,
                showAlertEdit,
                insertProduct,
                clearInputs,
                orderStates,
                setOrderStates,
                handleClickOrderState,
                clearOrderState,
                actualOrderState,
                makeStatusCompleted,
                makeStatusShipped,
                deleteOrder,
                setShowAlertOrders,
                showAlertOrders,
                orderUpdate,
                setOrderUpdate,
                showAlertCart,
                setShowAlertCart

            }}


        >{children}</SubstanceContext.Provider>
    )
}
export {
    SubstanceProvider
}
export default SubstanceContext




