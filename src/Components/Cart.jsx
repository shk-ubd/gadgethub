import React, { useRef } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/stateContext'
import { urlFor } from '../../lib/client'
import getStripe from '../../lib/getStripe'

const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantity, cartItems, setShowCart, toggleCartItemqQuantity, onRemove} = useStateContext()

  // const handleCheckout = async () => {
  //   const stripe = await getStripe()
  //   const response = await fetch('http://localhost:4242/create-checkout-session', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({cartItems})
  //   })
  //   console.log(response)

  //   if (response.statusCode === 500) return

  //   const data = await response.json()
  //   console.log("DAATATATA:", data)
  //   toast.loading('Redirecting...')
  //   stripe.redirectToCheckout({ sessionId: data.id });
  // }
  const handleCheckout = async () => {
    try {
    const stripe = await getStripe();
   
   const response = await fetch('http://localhost:4242/create-checkout-session', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cartItems })
    });
    
   console.log("Response: ", response);
   
   if (!response.ok) {
    console.error('Failed to create checkout session', response.statusText);
    return;
    }
   
   const data = await response.json();
    console.log("DATA: ", data);
   
   toast.loading('Redirecting...');
   console.log(data.id)
   const result = await stripe.redirectToCheckout({ sessionId: data.id });
   
   if (result.error) {
    console.error('Stripe redirect error:', result.error.message);
    }
    } catch (error) {
    console.error('Error during checkout:', error);
    }
   };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantity} items)</span>
        </button>
        {
          cartItems.length < 1 && (<div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your Shopping bag is empty</h3>
            <Link to='/' >
              <button type='button' className='btn' onClick={() => { setShowCart(false) }}>
                Continue Shopping
              </button>
            </Link>
          </div>)
        }
        <div className="product-container">
          {
            cartItems.length >= 1 && cartItems.map((item, index) => (
              <div key={item._id} className='product'>
                <img src={urlFor(item?.image[0])} alt="" className='cart-product-image' />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className='quantity-desc'>
                        <span className="minus" onClick={()=>{toggleCartItemqQuantity(item._id, 'dec')}}>
                          <AiOutlineMinus />
                        </span>
                        <span className="num" >
                          {item.quantity}
                        </span>
                        <span className="plus" onClick={()=>{toggleCartItemqQuantity(item._id, 'inc')}}>
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button type='button' className='remove-item' onClick={()=> onRemove(item._id) }>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {
          cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button type='button' className='btn' onClick={handleCheckout}>
                  Pay with Stripe
                </button>
              </div>
            </div>
          )

        }
      </div>
    </div>
  )
}

export default Cart