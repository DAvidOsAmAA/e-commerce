import React from 'react';
import styles from './Home.module.scss'
import FeatureProduct from '../FeatureProduct/FeatureProduct';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <FeatureProduct />
    </>
  )
}
