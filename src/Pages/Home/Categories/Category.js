import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
  const { cat_id, img, name } = category
  return (
    <div className=''>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure><img src={img} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title text-center">{name}</h2>
          <div className="card-actions justify-end">
            <Link to={`category/${cat_id}`}>
            <button className="btn btn-primary">Explore Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;