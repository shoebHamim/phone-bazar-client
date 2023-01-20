import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
  const { cat_id, img, name } = category
  return (
    <div>
      <div className="card card-compact lg:h-96 bg-base-100 shadow-xl">
        <figure><img src={img} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title text-center">{name}</h2>
          <div className="card-actions justify-end">
            <Link to={`categories/${cat_id}`}>

            <button className="btn btn-primary">Buy Now</button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;