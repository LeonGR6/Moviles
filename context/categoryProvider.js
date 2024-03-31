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
    const [showAlertDialog, setShowAlertDialog] = useState(false)



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
            setActualCategory({})

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (user?.accessToken) {
            getCategories(user?.accessToken);
        }
    }, [user?.accessToken])




    //function to open/close the product modal
    const handleClickModal = () => {
        setModal(!modal)
    }


    //function to open/close the product modal in ADMIN
    const handleClickAdmin = () => {
        setModaladmin(!modalAdmin)
        setImages({})
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
        try {
            const category = categories.filter(category => category.id === id)[0]
            setActualCategory(category)

        } catch (error) {
            console.log(error)
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
    const updateProduct = async () => {
        if (user?.accessToken) {
            const accessToken = user.accessToken;
            try {
                const productData = {
                    name: nameEdit,
                    description: descriptionEdit,
                    price: priceEdit,
                };

                if (images !== null && images.length > 0) {
                    const imagesBase64 = images.map(image => ({
                        name: image.name,
                        type: image.type,
                        uri: image.uri.split(',')[1]
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
                setImages({})
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('El objeto user es null');
        }
    };



    const clearCategory = () => {
        setActualCategory([]);
    };

    ///////////////EDIT PRODUCT ON ADMIN///////////////////
    const [nameEdit, setNameEdit] = useState('');
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [priceEdit, setPriceEdit] = useState('');

    const getProduct = async (idP) => {
        const accessToken = user?.accessToken;

        const { data } = await clientAxios(`/api/products/${idP}`, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
        console.log(data.product)
        const { name, description, price } = data.product
        setNameEdit(name);
        setPriceEdit(price);
        setDescriptionEdit(description);
    }

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
                getProduct,
                deleteProduct,
                setShowAlertDialog,
                showAlertDialog

            }}


        >{children}</SubstanceContext.Provider>
    )
}
export {
    SubstanceProvider
}
export default SubstanceContext




