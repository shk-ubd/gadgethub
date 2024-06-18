import React from 'react'
import { urlFor } from '../../lib/client'
import { Link } from 'react-router-dom'

const Product = ({product: { image, name, slug, price}}) => {
  return (
    <div>
      <Link to={`/product/${slug.current}`}>
      <div className="product-card">
        {image && <img 
        src={urlFor(image[0])} 
        width={250} 
        height={250} 
        className='product-image'
        alt={name} />}

        <p className="product-name">{name}</p>
        <p className="product-price">${price}</p>
      </div>
      </Link>
    </div>
  )
}

export default Product