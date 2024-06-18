import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { urlFor } from '../../lib/client'
import { client } from '../../lib/client'
import { AiOutlinePlus, AiOutlineMinus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Product from './Product'
import { useStateContext } from '../context/stateContext'
import { toast } from 'react-hot-toast'

const ProductDetails = () => {
    const { slug } = useParams()
    const [productDetails, setProductDetails] = useState({})
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [index, setIndex] = useState(0)
    const [counter, setCounter] = useState(0)

    const { incQty, decQty, qty, onAdd, setShowCart, setQty } = useStateContext()


    useEffect(() => {
        setProductDetails({})
        setSuggestedProducts([])
        setIndex(0)
        setQty(1)
        const fetchProducts = async () => {
            const query = `*[_type == 'product' && slug.current == '${slug}']`
            const productData = await client.fetch(query)
            setProductDetails(productData[0])

            const suggestedQuery = `*[_type == 'product' && slug.current != '${slug}']`
            const suggestedData = await client.fetch(suggestedQuery)
            setSuggestedProducts(suggestedData)
        }

        fetchProducts()
    }, [slug])
    const handleAddToCart = () => {

        if (productDetails?.name) {
            onAdd(productDetails, qty)
        }
    }

    const handleBuyNow = () => {
        if (productDetails?.name) {
            onAdd(productDetails, qty)
            setShowCart(true)
        }
    }




    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className='image-container'>
                        {productDetails?.image ? <img className='product-detail-image' src={urlFor(productDetails.image[index])} alt="" /> : <div className='product-detail-image'></div>}
                    </div>
                    <div className="small-images-container">
                        {productDetails?.image && productDetails.image.map((item, i) => (
                            <img key={i} src={urlFor(item)}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                alt="" onMouseEnter={() => { setIndex(i) }} />
                        ))}
                    </div>
                </div>
                <div className="product-detail-desc">
                    <h1>{productDetails?.name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details:</h4>
                    <p>{productDetails?.details}</p>
                    <p className="price">${productDetails?.price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span className="minus" onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className="num" >
                                {qty}
                            </span>
                            <span className="plus" onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type='button' className='add-to-cart' onClick={handleAddToCart}>Add to Cart</button>
                        <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {suggestedProducts.map((item) => (
                            <Product key={item._id} product={item} />))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails