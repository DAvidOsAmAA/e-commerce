import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styles from './FeatureProduct.module.scss';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { WishList } from '../../context/WishlistContext';

export default function FeatureProduct() {
  const { AddToCart } = useContext(CartContext);
  const { addToWishList } = useContext(WishList);
  const [clickedHeart, setClickedHeart] = useState([]);

  async function getProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  async function AddProductToCart(id) {
    let res = await AddToCart(id);
    if (res.status === "success") {
      toast.success("Added To Cart");
    } else {
      toast.error("Failed Added To Cart");
    }
  }

  const handleHeartClick = async (id) => {
    if (clickedHeart.includes(id)) {
      setClickedHeart(clickedHeart.filter((item) => item !== id));
      //await removeFromWishList(id);
      toast.error("Removed From Wishlist");
    } else {
      setClickedHeart([...clickedHeart, id]);
      await addToWishList(id);
      toast.success("Added To Wishlist");
    }
  };
  

  let { data, error, isLoading, isFetched } = useQuery("FeatureProduct", getProducts);

  return (
    <section className='py-5'>
      {/* Heart icon for wish list */}
      <div className={`text-end ${styles.heartIcon}`}>
        
      </div>
      
      {isLoading && <div className='d-flex justify-content-center bg-main vh-100 w-100 position-fixed '>
        <i className='fas fa-spinner fa-spin fa-5x'></i>
      </div>}
      {error && <div className='alert alert-danger'>
        {error}
      </div>}
      {data?.data.data && (
        <div className={`container ${styles.cardContainer}`} >
          <h1 className='text-primary'>Feature Product</h1>
          <div className={`row ${styles.cardRow}`}>
            {data.data.data.map((product, index) => (
              <div key={product.id} className={`col-md-2 w-25`} >
                <div className={`product mb-3 p-2 ${styles.cardInner} p-3`}>
                <i 
                  onClick={() => handleHeartClick(product.id)} 
                  className={`fas fa-heart  fs-3 mb-3 ${styles.addButton} ${clickedHeart.includes(product.id) ? styles.clicked : ''}`}
                ></i>

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
                  <button className={`btn btn-primary bg-main w-100 ${styles.addButton}`} onClick={() => AddProductToCart(product.id)}>Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
