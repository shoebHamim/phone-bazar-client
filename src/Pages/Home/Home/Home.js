import React from 'react';
import Ads from '../Ads/Ads';
import Categories from '../Categories/Categories';
import ProductCount from '../ProductCount/ProductCount';
import Slider from '../Slider/Slider';

const Home = () => {
  return (
    <>
      <Slider></Slider>
      <Categories></Categories>
      <Ads></Ads>
      <ProductCount></ProductCount>
    </>
  );
};

export default Home;