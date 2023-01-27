import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import verify from './verify.png'
const Product = ({ product,userType, setSelectedItem,pay,deleteProduct,handleAdvertise }) => {
  const { name,status, location,advertise, resale_price, original_price, years_used, posting_time, seller_name, verified, img } = product
  const reportProduct=(id)=>{
      console.log(id);
      fetch(`http://localhost:5000/products/${id}`,{
        method:'PUT'
      })
      .then(res=>res.json())
      .then(data=>toast.success('Product has been reported to the admin !'))
  }


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
            {
               userType==='user' && !product.reported&&
               <label onClick={()=>reportProduct(product._id)} className='btn btn-sm rounded-full btn-error btn-outline self-center'>Report</label>
              
            }{
              userType==='user' && product.reported&&
              <label onClick={()=>reportProduct(product._id)} className='btn btn-sm rounded-full btn-error btn-outline self-center' disabled>Reported</label>
            }
            
            {setSelectedItem && <>
              
              <label onClick={() => {
              setSelectedItem(product)
            }
            } htmlFor="booking-modal" className="btn btn-primary">Book Now!</label>
            </>
            }
            {(pay && pay.paymentStatus!=='paid')&&
            <Link to={`/dashboard/payment/${pay._id}`} className='btn btn-primary'>Pay</Link>
            }{(pay && pay.paymentStatus=='paid')&&
            <Link disabled className='btn btn-primary'>Paid</Link>
            }

            {
              deleteProduct && <label onClick={() => deleteProduct(product._id)
              } htmlFor="booking-modal" className="btn btn-primary">Delete</label>
            }
            {status==='available'&& !advertise&& deleteProduct&& 
            <label onClick={()=>handleAdvertise(product._id)}  htmlFor="booking-modal" className="btn btn-success btn-outline ">Advertise</label>
            }{
              deleteProduct&&advertise && <button className='btn' disabled>Advertising</button>
            }

            
           

          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;