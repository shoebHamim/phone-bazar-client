import React from 'react';
import verify from './verify.png'
const Product = ({ product, setSelectedItem,pay,deleteProduct,handleAdvertise }) => {
  const { name,status, location,advertise, resale_price, original_price, years_used, posting_time, seller_name, verified, img } = product
  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
        <figure><img src={img} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <ul>
            <li>location: {location}</li>
            <li>Price: {resale_price}$</li>
            <li>Original Price: {original_price}$</li>
            <li>Years Used: {years_used}</li>
            <li>Posting Time: {posting_time}</li>
            {
              deleteProduct &&
            <li>Status: {status}</li>
            }
            <li className='flex'>Seller Name: {seller_name}
              {verified && <>
                <img className='w-6 ml-1' src={verify} alt="" />
              </>}</li>
          </ul>
          <div className="card-actions justify-end">
            {setSelectedItem &&
             <label onClick={() => {
              setSelectedItem(product)
            }
            } htmlFor="booking-modal" className="btn btn-primary">Book Now!</label>
            
            }
            {pay &&
            <label onClick={() => {
              setSelectedItem(product)
            }
            } htmlFor="booking-modal" className="btn btn-primary">Pay</label>
            }{
              deleteProduct && <label onClick={() => deleteProduct(product._id)
              } htmlFor="booking-modal" className="btn btn-primary">Delete</label>
            }
            {status==='available'&& !advertise&& 
            <label onClick={()=>handleAdvertise(product._id)}  htmlFor="booking-modal" className="btn btn-success btn-outline ">Advertise</label>
            }{
              advertise && <button className='btn' disabled>Advertising</button>
            }

            
           

          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;