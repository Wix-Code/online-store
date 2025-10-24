import React from 'react'
import Banner from './components/home/Banner'
import TopSellingProducts from './components/home/TopSellingProducts'
import InfoCard from './components/home/InfoCard'
import TopSellingStores from './components/home/TopSellingStores'
import HeroPage from './components/home/HeroPage'

const page = () => {
  return (
    <div>
      <HeroPage />
      <Banner />
      <TopSellingProducts />
      <InfoCard />
      <TopSellingStores />
    </div>
  )
}

export default page