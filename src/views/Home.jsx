import React, { useEffect, useState } from 'react'
import '../scss/_products.scss'
import t from '../translations/i18n'
import generalLogic from '../functions/logic/generalLogic'
import productsLogic from '../functions/logic/productsLogic'
import Recomendations from './home/Recomendations'
import Popular from './home/Popular'
import Spiner from '../components/modals/Spiner'


export default function Home() {

    const [cat, setCategories] = useState(false)
    const [load, setLoad] = useState(false)
    const [catInfo, setCatInfo] = useState([])
    const [prod, setProd] = useState(true)
    const [prodInfo, setProdInfo] = useState([])

    useEffect(() => {
        setLoad(true)
        getIp()
        getProducts()
        setLoad(false)
    }, [])

    const getIp = async () => {
        const ip = await generalLogic.getIpClient()
        localStorage.setItem('ip', ip["ipString"])
    }

    const getProducts = async () => {
        const categories = await productsLogic.getCategoriesLogic()
        if (categories.success && categories.data.length > 0) {
            setCategories(true)
            setCatInfo(categories.data)
        }

        const prodcuts = await productsLogic.getProductsLogic(0, '')
        if (prodcuts.success && prodcuts.data.length > 0) {
            setProd(true)
            setProdInfo(prodcuts.data)
        }
    }

    return (
        <>
            <br/>

            <Spiner opt={load} />
            
             {/*cat && (<Popular t={t} data={catInfo} />)*/}

            {prod && (<Recomendations t={t} data={prodInfo} />)}

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




