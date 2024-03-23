import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.scss'
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Formik, useFormik } from 'formik';

export default function Cart() {
  const { numberOfItems, getCart, removeFromCart, updateProductQnt } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  async function getCartDetails() {
    try {
      const { data } = await getCart();
      if (data) {
        setCartDetails(data);
      }
    } catch (error) {
      console.log(error,"from cart num")
      setCartDetails(null);
    }
  }


  const initialValues = {
  }
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => console.log(values)
  })


  async function updateProduct(id, count) {
    try {
      const data = await updateProductQnt(id, count);
      console.log(data); // Log the response data to inspect its structure
      if (data.status === 'success') {
        setCartDetails(data.data); // Update the cart details in the local state
        toast.success("Product quantity updated successfully");
      } else {
        throw new Error("Status is not 'success'");
      }
    } catch (error) {
      console.log(error.message); // Log the error message for debugging
      toast.error("Oops, something went wrong: " + error.message); // Show the error message in the toast
    }
  }
  
  async function removeProductFromCart(id) {
    const { data } = await removeFromCart(id);
    console.log(data)
    if (data) {
      setCartDetails(data)
      toast.success("Product removed successfully")
    } else {
      toast.error("Ops something went wrong")
    }
  }

  useEffect(() => {
    getCartDetails();

  }, [])
  return (

    <section className='py-5'>
      <div className="container">
        <h2>Shopping Cart</h2>
        <div className="row bg-light">
          <div className="d-flex justify-content-between mt-5 ">
            <h3 className='ms-3'>Total price <span className='text-primary'>{cartDetails ? cartDetails.totalCartPrice : 0}</span></h3>
            <h3 className='me-3'>Total Items <span className='text-primary'>{numberOfItems}</span></h3>
          </div>
          {cartDetails && cartDetails.products && cartDetails.products.length > 0 ? cartDetails.products.map((product) => (
            <div className="row">
              <div className="col-md-1">
                <figure>
                  <img className='img-fluid' src={product.product.imageCover} alt={product.product.title} />
                </figure>
              </div>
              <div className="col-md-9 d-flex justify-content-between align-items-center">
                <div>
                  <h5 className='fw-bold'>{product.product.title}</h5>
                  <h6 className='text-success fw-bold'>{product.price}</h6>
                  <button className='btn text-danger' onClick={() => removeProductFromCart(product.product.id)}><i className='fa fa-trash me-2'></i>remove</button>
                </div>
                <div className="d-flex align-items-center">
                  <button className='btn btn-outline-success'
                    onClick={() => updateProduct(product.product.id, product.count + 1)}>+</button>
                  <span className='mx-2'>{product.count}</span>
                  <button className='btn btn-outline-danger'
                    onClick={() => updateProduct(product.product.id, product.count - 1)}>-</button>
                </div>
              </div>
            </div>
          )) : <h2 className='text-primary'>There are no products in the cart
          </h2>}

          <Link to={"/checkout"} className='btn btn-success bg-main w-75 mt-4 mb-4 mx-auto d-block'>Check out</Link>
        </div>
      </div>
    </section>
  )
}

