import React from 'react';
import Ads from '../Ads/Ads';
import Categories from '../Categories/Categories';
import Slider from '../Slider/Slider';

const Home = () => {
  return (
    <>
      <Slider></Slider>
      <Categories></Categories>
      <Ads></Ads>
    </>
  );
};

export default Home;