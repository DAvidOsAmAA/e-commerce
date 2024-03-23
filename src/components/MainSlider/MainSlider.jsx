import React from 'react';
import styles from './MainSlider.module.scss'
import Slider from 'react-slick';

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="py-5">
      <div className="container">
        <h1 className='text-primary mbt-4'>MainSlider</h1>
        <div className="row g-0">
          <div className="col-md-9">
            <Slider {...settings}>
              <figure>
                <img style={{ width: '100%', height: '400px' }} src={require("../../assets/images/images/slider-image-1.jpeg")} alt="" />
              </figure>
              <figure>
                <img style={{ width: '100%', height: '400px' }} src={require("../../assets/images/slider-image-2.jpeg")} alt="" />
              </figure>
              <figure>
                <img style={{ width: '100%', height: '400px' }} src={require("../../assets/images/slider-image-3.jpeg")} alt="" />
              </figure>
            </Slider>
          </div>
          <div className="col-md-3">
            <figure className='mb-0'>
              <img style={{ width: '100%', height: '200px' }} src={require("../../assets/images/grocery-banner.png")} alt="" />
            </figure>
            <figure className='mb-0'>
              <img style={{ width: '100%', height: '200px' }} src={require("../../assets/images/grocery-banner-2.jpeg")} alt="" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
}
