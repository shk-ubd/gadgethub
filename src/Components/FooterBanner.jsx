import React from 'react'
import { Link } from 'react-router-dom'
import { urlFor } from '../../lib/client'
const FooterBanner = ({footerBanner}) => {
  return (
    <div className='footer-banner-container'>
      {footerBanner? <div className="banner-desc">
        <div className="left">
          <p>{footerBanner.discount}</p>
          <h3>{footerBanner.largeText1}</h3>
          <h3>{footerBanner.largeText2}</h3>
          <p>{footerBanner.saleTime}</p>
        </div>
        <div className="right">
          <p>{footerBanner.smallText}</p>
          <h3>{footerBanner.midText}</h3>
          <p>{footerBanner.desc}</p>
          <Link to={`product/${footerBanner.product}`}>
          <button type='Button'>{footerBanner.buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(footerBanner.image)} className='footer-banner-image' alt="" />
      </div>: <div className='loader-container'><div className="loader"></div></div>}
    </div>
  )
}

export default FooterBanner