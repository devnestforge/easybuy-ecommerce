import React, { useEffect, useState } from 'react'
import '../scss/_products.scss'
import t from '../translations/i18n'
import generalLogic from '../functions/logic/generalLogic'
import Outlet from './home/Outlet'
import Offers from './home/Offers'
import Promotions from './home/Promotions'
import TodayDeal from './home/TodayDeal'
import Spiner from '../components/modals/Spiner'

export default function Home() {

    const [load, setLoad] = useState(false)

    useEffect(() => {
        getIp()
    }, [])

    const getIp = async () => {
        setLoad(true)
        const ip = await generalLogic.getIpClient()
        localStorage.setItem('ip', ip["ipString"])
        setLoad(false)
    }

    return (
        <>
            <br />

            <Spiner opt={load} />

            {/*cat && (<Popular t={t} data={catInfo} />)*/}
            <div className="container-fluid">
                {
                    <>
                        <Promotions t={t} />
                        <Offers t={t} />
                        <TodayDeal t={t} />
                    </>

                }
            </div>
            {/*
                promotions && ( <Promotions data={promoInfo} /> )
        
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
            */}

        </>
    )
}




