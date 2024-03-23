import React, { useContext, useEffect, useState } from 'react';
import styles from './Allorder.css';

import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function AllOrder() {
  const { userId } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  async function getMyOrders() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  useEffect(() => {
    getMyOrders();
  }, [])

  return (

    <div className="">
      {orders.map((order, index) => (
        <div className="col-md-3 mt-5 " key={index}>
          <div className={`card text-white ${getCardColor(index)} mb-3`} style={{ maxWidth: '18rem' }}>
            <div className="card-header">Order {index + 1}</div>
            <div className="card-body">
              <p className="card-text">Tax Price: {order.taxPrice}</p>
              <p className="card-text">Shipping Price: {order.shippingPrice}</p>
              <p className="card-text">Total Order Price: {order.totalOrderPrice}</p>
              {/* Add more details as needed */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Function to determine card color based on index
function getCardColor(index) {
  const colors = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info', 'bg-light', 'bg-dark'];
  return colors[index % colors.length];
}
