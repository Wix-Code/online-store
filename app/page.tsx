import React from 'react'
import Banner from './components/home/Banner'
import TopSellingProducts from './components/home/TopSellingProducts'
import InfoCard from './components/home/InfoCard'

const page = () => {
  return (
    <div>
      <Banner />
      <TopSellingProducts />
      <InfoCard />
    </div>
  )
}

export default page