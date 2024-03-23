import React, { useState } from 'react';
import styles from './CheckOut.module.scss'
import { useFormik } from 'formik';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';




export default function CheckOut() {
  const { cartId } = useContext(CartContext);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);

  const initialValues = {
    details: "",
    phone: "",
    city: ""
  }
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => handelPayment(values)
  })

  async function handelPayment(values) {

    console.log(values, cartId)
    const endPoint = isOnlinePayment ?
  `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
  :
  `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

    try {
      const { data } = await axios.post(endPoint, {
        shippingAddress: values
      }, { headers: { token: localStorage.getItem("token"), } }
      )
      if (data.status == "success") {
        if(isOnlinePayment){
          window.location.href = data.session.url;
          toast.success("Order placed successfully")
        }else{
          console.log(data)
          toast.success("Order placed successfully")
        }
      } else {
        toast.error("Ops something went wrong")

      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <section className="py-5">
      <div className="container">
        <h2>Check out</h2>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className='form-group mb-3'>
            <label htmlFor="phone">Phone</label>
            <input type="text" className='form-control' id='phone'
              value={formik.values.phone}
              onChange={formik.handleChange} />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor="City">City</label>
            <input type="text" className='form-control' id='City'
              value={formik.values.City}
              onChange={formik.handleChange} />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor="details">Details</label>
            <textarea type="text" name='details' cols="30" rows="3" className='form-control' id='details'
              value={formik.values.details}
              onChange={formik.handleChange} ></textarea>
          </div>
          <div>
            <input type="checkbox" className='form-check-input mt-2 me-2'
            onChange={() => setIsOnlinePayment(!isOnlinePayment)} />Is Online
            {isOnlinePayment ?
              <button className='btn btn-success bg-main ms-2'>Online Payment</button>
              :
              <button className='btn btn-success bg-main ms-2'>Cash Payment</button>
            }
          </div>
        </form>
      </div>
    </section>
  )
}
