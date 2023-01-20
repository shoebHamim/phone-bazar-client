import React from 'react';

const Product = ({ product }) => {
  console.log(product);

  const { name, location, resale_price, original_price, years_used, posting_time, seller_name, verified, img } = product
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
            <li>Seller Name: {seller_name}
            {verified&&<>✔️</>}</li>
          </ul>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;