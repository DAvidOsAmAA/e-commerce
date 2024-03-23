import React, { useEffect, useState } from 'react';
import styles from './Categories.module.scss'
import axios from 'axios';

export default function Categories() {
  const [category, setCategory] = useState([])

  async function getCategory() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    const categoryArray = response.data;
    console.log(categoryArray, "categoryArray")
    setCategory(categoryArray.data)
  }


  useEffect(() => {
    getCategory();
  }, [])
  return (
    <div className='container-fluid'>
      <h1 className='text-primary mt-3 ms-3'>Category</h1>
      <div className="row ms-5">
        {category.map((category) => (
          <div key={category.id} className="col-12 col-md-4 col-lg-3 mt-3 mb-3">
            <div className="card" style={{ height: '100%' }}>
              <img style={{ height: '230px' }}  className='card-img-top img-fluid' src={category.image} alt={category.name} />
              <div className="card-body">
                <p className="card-text text-primary fw-bold">{category.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
