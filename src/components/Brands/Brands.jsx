import React, { useEffect, useState } from 'react';
import styles from './Brands.module.scss'
import axios from 'axios';

export default function Brands() {
  const [brands, setBrands] = useState([])
  async function getBrands() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    const brandsArray = response.data;
    console.log(brandsArray,"brandsArray")
    setBrands(brandsArray.data);

  }
  console.log(brands, "from brands")


  useEffect(() => {
    getBrands();
  }, [])
  return (
    <div className='container-fluid'>
      <h1 className='text-primary'>Brands</h1>
      <div className="row ms-5" >
        {brands.map((brand) => {
          return <div className="col-4 col-lg-4">
            
            <img className='img-fluid' src={brand.image} alt={brand.name} />
          </div>
        })}
      </div>
    </div>
  )
}
