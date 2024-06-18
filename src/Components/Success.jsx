import React, { useEffect, useState } from 'react'
import { BsBagCheckFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/stateContext'
import { realisticConfetti } from '../../lib/utils'



const Success = () => {
    const {setCartItems, setTotalPrice, setTotalQuantity } = useStateContext()

    useEffect(() => {
      localStorage.clear()
      setCartItems([])
      setTotalPrice(0)
      setTotalQuantity(0)
      realisticConfetti()
    },[])
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank You for the Order!</h2>
        <p className="email-msg">
          Your order has been placed successfully. You will receive an email confirmation shortly.
        </p>
        <p className="description">
          If you have any questions please email us at <a className="email" href="mailto:order@example.com">order@example.com</a>
        </p>
        <Link to={"/"}>
          <button type="button" width="300px" className="btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default Success 