import React, { useEffect, useState } from 'react'
import generalLogic from '../functions/logic/generalLogic'
import productsLogic from '../functions/logic/productsLogic'
import Promotions from './home/Promotions'
import Recomendations from './home/Recomendations'
import Popular from './home/Popular'
import Arrivals from './home/Arrivals'
import Outlet from './home/Outlet'
import Trendings from './home/Trendings'
import Details from './home/Details'

export default function Home() {

    const [promotions, setPromotions] = useState(true)
    const [promoInfo, setPromoInfo] = useState([])

    useEffect(() => {
        getIp()
        getProducts()
    }, [])

    const getIp = async () => {
        const ip = await generalLogic.getIpClient()
        localStorage.setItem('ip', ip["ipString"])
    }

    const getProducts = async () => {
        const promotions = await productsLogic.getPromotionsLogic()
        if (promotions.success && promotions.data.length > 0) {
            setPromotions(true)
            setPromoInfo(promotions.data)
        } else {
            setPromotions(false)
        }
    }

    return (
        <>
            {
                promotions && ( <Promotions data={promoInfo} /> )
               
            }


            <Recomendations />

            <Popular />

            <Arrivals />

            <div className="mb-6"></div>

            <Outlet />

            <Trendings />

            <div className="mb-5"></div>

            <div className="mb-4"></div>

            <div className="container-fluid">
                <hr className="mb-0" />
            </div>

            <Details />
        </>
    )
}




