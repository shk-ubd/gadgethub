import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineShopping } from 'react-icons/ai'
import Cart from './Cart'
import { useStateContext } from '../context/stateContext'


const Navbar = () => {
  const {showCart, setShowCart, totalQuantity} = useStateContext()
  return (
    <div className="navbar-container">
      <p className="logo">
        <NavLink to='/'>GadgetHub</NavLink>
      </p>

      <button type='button' className='cart-icon' onClick={()=>{ setShowCart(true)}}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantity}</span>
      </button>

      {showCart && <Cart />
}
    </div>
  )
}

export default Navbar