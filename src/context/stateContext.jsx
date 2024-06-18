import React, { createContext, useContext, useState } from 'react'
import {toast} from 'react-hot-toast'

const context = createContext()

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct;
    let index;


    const onAdd = (product, quantity) => {
        const checkProductinCart = cartItems.find(item => item._id === product._id)
        setTotalPrice((prev) => prev + product.price * quantity)
        setTotalQuantity((prev) => prev + quantity)

        if(checkProductinCart){

            const updatedCart = cartItems.map(item => {
                if(item._id === product._id){
                    return {...item, quantity: item.quantity + quantity}
                }
                return item
            })
            setCartItems(updatedCart.sort((a, b) =>( new Date(a._createdAt) - new Date(b._createdAt))))
        }
        else{
            setCartItems([...cartItems, {...product, quantity: quantity}].sort((a, b) =>( new Date(a._createdAt) - new Date(b._createdAt))))
        }
        toast.success(`${qty} ${product.name} added to cart.`)
    }

    const onRemove = (id) => {
        const foundProduct = cartItems.find( item => item._id === id)
        const newCartItems = cartItems.filter(item => item._id !== id) 
        setTotalPrice(prev => Number( (prev - (foundProduct.price * foundProduct.quantity)).toFixed(2) ))
        setCartItems(newCartItems.sort((a, b) =>( new Date(a._createdAt) - new Date(b._createdAt))))
        setTotalQuantity(prev => prev - foundProduct.quantity)
    }




    const toggleCartItemqQuantity = (id, value) => {
        foundProduct = cartItems.find(item => item._id === id)
        index = cartItems.findIndex(item => item._id === id)
        let newCartItems = cartItems.filter((item)=> {
            if(item._id !== id){
                return item
            }
        })

        if(value === 'inc'){
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}].sort((a, b) =>( new Date(a._createdAt) - new Date(b._createdAt))))
            setTotalPrice((prev) => Number((prev + foundProduct.price).toFixed(2)))
            setTotalQuantity((prev) => prev + 1)
        }
        else if(value === 'dec'){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}].sort((a, b) =>( new Date(a._createdAt) - new Date(b._createdAt))))
                setTotalPrice((prev) => Number((prev - foundProduct.price).toFixed(2)))
                setTotalQuantity((prev) => prev - 1)
            }
        }

    } 





    const incQty = () => {
        setQty((prev) => prev + 1)
    }
    const decQty = () => {       
        setQty((prev) => (prev > 1? prev - 1: 1))
    }

    return (
        <context.Provider value={{showCart, cartItems, totalPrice, totalQuantity, qty, setQty, incQty, decQty, onAdd, setShowCart, toggleCartItemqQuantity, onRemove, setCartItems, setTotalPrice, setTotalQuantity}}>
            {children}
        </context.Provider>
    )
}


export const useStateContext = () => {
    return useContext(context)
}