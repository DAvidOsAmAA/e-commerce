import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styles from '../FeatureProduct/FeatureProduct.module.scss';

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  
  async function getProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  
  let { data, error, isLoading, isFetched } = useQuery("FeatureProduct", getProducts);

  const filteredProducts = data?.data.data.filter(product => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <section className='py-5'>
      <div className="container">
        <input 
          type="text" 
          className="form-control mb-3" 
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {isLoading && <div className='d-flex justify-content-center bg-main vh-100 w-100 position-fixed '>
        <i className='fas fa-spinner fa-spin fa-5x'></i>
      </div>}
      {error && <div className='alert alert-danger'>
        {error}
      </div>}
      {filteredProducts && (
        <div className={`container ${styles.cardContainer}`}>
          <h1 className='text-primary'>All Product</h1>
          <div className={`row ${styles.cardRow}`}>
            {filteredProducts.map((product, index) => (
              <div key={product.id} className={`col-md-2 ${styles.card}`} >
                <div className={`product mb-3 p-2 ${styles.cardInner}`}>
                  <Link to={`/product-details/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                    <img className='img-fluid' src={product.imageCover} alt={product.title} />
                    <h3 className='h6 text-primary fw-bold text-truncate'>{product.category.name}</h3>
                    <h3 className='h6 fw-bold'>{product.title.split(" ").slice(0, 4).join(" ")}</h3>
                    <div className="d-flex">
                      <h4 className='h6'>{product.price} EGP</h4>
                      <h4 className='h6 ms-3'> <i className='fas fa-star text-warning'></i>
                        {product.ratingsAverage}</h4>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
