import React, { useContext } from 'react';
import styles from './ProductDetails.module.scss'
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
export default function ProductDetails() {
  let { id } = useParams()

  const { AddToCart } = useContext(CartContext);
  async function AddProductToCart(id){
    let res = await AddToCart(id);
    if(res.status == "success"){
      toast.success("Added To Cart")
    }else{
      toast.error("Failed Added To Cart")
    }
  }


  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let { data, error, isLoading, isError } = useQuery("productDetails", getProductDetails)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <section className='py-5'>
      {isLoading && <div className='d-flex justify-content-center bg-main vh-100 w-100 position-fixed '>
        <i className='fas fa-spinner fa-spin fa-5x'></i>
      </div>}
      <div className="container" style={{ height: "460px" }}>
        <h1 className='text-primary'>ProductDetails</h1>
        {error && <div className='alert alert-danger'>
          {error}
        </div>}
        {
          data?.data.data && <div className="row align-items-center">
            <div className="col-md-3">
              <Slider {...settings}>
                {data.data.data.images.map((img, index) => (
                  <figure key={index}>
                    <img src={img} alt={data?.data.data.title} className='img-fluid' />
                  </figure>
                ))}
              </Slider>

            </div>
            <div className="col-md-9">
              <h3 className='text-primary'>{data?.data.data.title}</h3>
              <p className='text-muted'>{data?.data.data.description}</p>
              <div className="d-flex">
                <div className=''>
                  <h4 className='h6'>{data?.data.data.category.name}</h4>
                  <div className='d-flex'>
                    <h4 className='h6'>{data?.data.data.price} EGP</h4>
                    <h4 className='h6 ' style={{ marginLeft: "450px" }}> <i className='fas fa-star text-warning'></i>
                      {data?.data.data.ratingsAverage}</h4>
                  </div>
                </div>
              </div>
              <button onClick={()=>AddProductToCart(id)} className='btn btn-primary bg-main mt-5 w-25 '>Add to cart</button>
            </div>
          </div>
        }
      </div>
    </section>

  )
}
