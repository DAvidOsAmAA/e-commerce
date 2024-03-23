import React from 'react';
import styles from './CategorySlider.module.scss'
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from 'react-slick';

export default function CategorySlider() {

  function getCategories(params) {
    return axios('https://ecommerce.routemisr.com/api/v1/categories')
  }


  let { data, error, isLoading, isFetched } = useQuery("categories", getCategories);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };
  return (
    <div className="py-5">
      {isLoading && <div className='d-flex justify-content-center bg-main vh-100 w-100 position-fixed '>
        <i className='fas fa-spinner fa-spin fa-5x'></i>
      </div>}
      <div className="container">
        <h1 className='text-primary mb-3'>Shop Popular Category</h1>
        {error && <div className='alert alert-danger'>
          {error}
        </div>}
        <Slider {...settings}>
          {data?.data.data.map((cat) => (
            <div key={cat.id} >
              <img style={{width:"100%",height:"250px"}}  className='img-fluid mb-3' src={cat.image} alt={cat.name} />
              <p className='text-muted fw-bolder' >{cat.name}</p>
            </div>
          ))}
        </Slider>
      </div>

    </div>

  )
}
