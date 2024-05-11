import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
   const [allproducts, setAllProducts] = useState([]);

   const fetchinfo = async () => {
      try {
         const response = await fetch('http://localhost:4000/allproducts');
         const data = await response.json();
         setAllProducts(data);
      } catch (error) {
         console.error('Error fetching products:', error);
      }
   };

   useEffect(() => {
      fetchinfo();
   }, []);
   
   const remove_product=async(id)=>{
      await fetch('http://localhost:4000/removeproduct',{
         method:'POST',
         headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
         },
         body:JSON.stringify({id:id})
      })
      await fetchinfo();
   }
   return (
      <div className='list-product'>
         <h1>All Products List</h1>
         <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old_Price</p>
            <p>New_Price</p>
            <p>Category</p>
            <p>Remove</p>
         </div>
         <div className="listproducts-allproducts">
            <hr />
            {allproducts.map((product, index) => (
                <div key={index} className="listproduct-format-main listproduct-format">
                  <img src={product.image} alt="" className="listproduct-product-icon" />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
                  <hr />
               </div>
            ))}
         </div>
      </div>
   );
};

export default ListProduct;
