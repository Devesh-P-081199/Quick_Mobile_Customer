import React from 'react'
import SelectVarient from '../../Components/SellDeviceVarientSelect/SellDeviceVarient'
import GetUpto from '../../Components/GetUpto/GetUpto'
import BreadCrumb from '../../Common/BreadCrumb/BreadCrumb'
import SelectBrand from '../../Components/SelectBrand/SelectBrand'
import SelectModel from '../../Components/SelectModel/SelectModel'

function GetPriceUpto() {
  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <GetUpto />
     


    </>
  )
}

export default GetPriceUpto