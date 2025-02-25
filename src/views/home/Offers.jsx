import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Spiner from '../../components/modals/Spiner'
import productsLogic from '../../functions/logic/productsLogic'
import { useSnackbar } from 'notistack'
import ProductsGrid from '../../components/ProductsGrid'

Modal.setAppElement('#root')

export default function Offers({ t }) {

    const [load, setLoad] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const [prodInfo, setProdInfo] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('no')
    const [totalPages, setTotalPages] = useState(1)
    const [filters, setFilters] = useState({
        category: [],
        brand: [],
    })

    useEffect(() => {
        getProducts()
    }, [])

    const paginate = (event, pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const getProducts = async () => {
        setLoad(true)
        const prodcuts = await productsLogic.getProductsByTypeLogic(0, currentPage, global.PEROD_BY_PAGE, searchTerm, filters, global.OFER_TYPE)
        if (prodcuts.success && prodcuts.data.length > 0) {
            setProdInfo(prodcuts.data)
            setTotalPages(Math.ceil(prodcuts.data[0].total / global.PEROD_BY_PAGE))
        } else {
            setProdInfo([])
            setTotalPages(1)
        }
        setLoad(false)
    }

    return (
        <>
            <Spiner opt={load} />
            <div className="container-fluid for-you">
                <div className="heading heading-flex mb-3">
                    <div className="heading-left">
                        <h2 className="title">{t('products.products')}</h2>
                    </div>
                    <div className="heading-right">
                        <a href={global.PRODUCTSEARCH} className="title-link">
                            {t('products.view_more_products')} <i className="icon-long-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <ProductsGrid data={prodInfo} totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
            </div>
            <div className="mb-2"></div>
        </>
    )
}
