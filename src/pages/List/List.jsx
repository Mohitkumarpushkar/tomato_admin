import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
 
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
       // Log the API response

      if (response.data && response.data.success) {
        setList(Array.isArray(response.data.foods) ? response.data.foods : []);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Error: " + error.message);
    }
  };

  const removeFood=async(foodId)=>{
    const response=await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error("Error removing food item");
    }

    
  }

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item, index) => {
            return (
              <div className="list-table-format" key={index}>
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
               
                <button onClick={()=>removeFood(item._id)} className='cursor'>X</button>
              </div>
            );
          })
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default List;
