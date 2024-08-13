import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import './Order.css';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      // Log the API response
      
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("An error occurred while fetching orders");
    }
  }
  

  const statusHandler=async(event,orderId)=>{
const response = await axios.post(url + "/api/order/status",{orderId,status:event.target.value});
if(response.data.success) {
  await fetchAllOrders();

}

  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  console.log("hi", orders);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt='' />
            <div className="c">
              <p className='order-item-food'>
                {
                  order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })
                }
              </p>
              <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street+","}</p>
                <p>{order.address.city+","}</p>
                <p>{order.address.state+","}</p>
                <p>{order.address.country+","}</p>
                <p>{order.address.zipCode}</p>


              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id )} value={order.status}>
              <option value='Food Processing'>Food Processing</option>
              <option value ='Out For Delivery'>Out for delivery</option>
              <option value='delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
