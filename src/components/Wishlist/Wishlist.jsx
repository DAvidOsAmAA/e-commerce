import React, { useContext, useEffect, useState } from 'react';
import styles from './Wishlist.module.scss';
import { WishList } from '../../context/WishlistContext';
import { toast } from 'react-toastify';

export default function Wishlist() {
  const { getWishList, removeFromWishList } = useContext(WishList);
  const [wishlistData, setWishlistData] = useState(null); // State to hold wishlist data

  async function getCartDetails() {
    try {
      const { data } = await getWishList();
      console.log(data, "hiiiiiii")
      setWishlistData(data); // Update wishlist data state
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  async function removeProductFromCart(id) {
    try {
      const { data } = await removeFromWishList(id);
      console.log(data)
      if (data) {
        getCartDetails(); // Fetch wishlist data again after removal
        toast.success("Product removed successfully")
      } else {
        toast.error("Ops something went wrong")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className='py-5'>
      <div className="container">
        <h2>Wishlist</h2>
        <div>
          <h3>Total Item <span>{wishlistData ? wishlistData.length : 0}</span></h3>
        </div>

        <section className='bg-light py-5'>
          {wishlistData && wishlistData.map((item) => (
            <div className="row py-3 my-3 ms-5" key={item._id}>
              <div className="col-md-1">
                <figure>
                  <img src={item.imageCover} className='img-fluid' alt={item.name} />
                </figure>
              </div>
              <div className="col-md-9">
                <figure>
                  <h3>{item.title}</h3>
                  <button className='btn text-danger' onClick={() => removeProductFromCart(item._id)}>
                    <i className='fas fa-heart-broken me-2' ></i> Remove
                  </button>
                </figure>
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
