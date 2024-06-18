import React, { useEffect, useState } from 'react'
import { Product, FooterBanner, HeroBanner } from './Components'
import { client } from '../lib/client';

const App = () => {
  const [products, setProducts] = useState([])
  const [banners, setBanners] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == 'product']`
        const productsData = await client.fetch(query)
        setProducts(productsData)
        console.log(productsData)

        const bannerQuery = `*[_type == 'banner']`
        const bannerData = await client.fetch(bannerQuery)
        console.log(bannerData)
        setBanners(bannerData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchProducts()
  }, [])



  return (
    <>
      <HeroBanner heroBanner={banners.length && banners[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of Many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      {banners.length > 0 && <FooterBanner footerBanner={banners && banners[0]} />}
    </>
  )
}




export default App