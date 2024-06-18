import React from 'react'
import { urlFor } from '../../lib/client'
import { Link } from 'react-router-dom'

const HeroBanner = ({heroBanner}) => {
  return (
    <div className='hero-banner-container'>
        {heroBanner?  <div>
            <p className="beats-solo">
                {heroBanner.smallText}
            </p>
            <h3>{heroBanner.midText}</h3>
            <h1>{heroBanner.largeText1}</h1>
            { heroBanner.image && <img src={`${urlFor(heroBanner.image)}`}alt="headphones" className='hero-banner-image'/>}
            <div>
                <Link to= {`/product/${heroBanner.product}`} >
                    <button type='button'>{heroBanner.buttonText}</button>
                </Link>
                <div className='desc'>
                    <h5>Description</h5>
                    <p>{heroBanner.desc}</p>
                </div>
            </div>

        </div>:
        <div className='loader-container'><div className="loader"></div></div>
    }
    </div>
  )
}

export default HeroBanner