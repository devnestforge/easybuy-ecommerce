import React, { useState, useEffect } from 'react'
import Recomendations from '../home/Recomendations'
import Spiner from '../../components/modals/Spiner'
import productsLogic from '../../functions/logic/productsLogic'
import generalLogic from '../../functions/logic/generalLogic'
import t from '../../translations/i18n'

export default function ShoppingCart() {

    const [cartItems, setCartItems] = useState([])
    const [load, setLoad] = useState(false)
    const [cat, setCategories] = useState(false)
    const [prod, setProd] = useState(true)
    const [catInfo, setCatInfo] = useState([])
    const [prodInfo, setProdInfo] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [shippingCost, setShippingCost] = useState(0)
    const [taxRate, setTaxRate] = useState(0.15)
    const [discountCode, setDiscountCode] = useState('')
    const [discountApplied, setDiscountApplied] = useState(false)
    const [discountAmount, setDiscountAmount] = useState(0)


    const getProducts = async () => {
        const categories = await productsLogic.getCategoriesLogic()
        if (categories.success && categories.data.length > 0) {
            setCategories(true)
            setCatInfo(categories.data)
        }

        const products = await productsLogic.getProductsLogic(0, '')
        if (products.success && products.data.length > 0) {
            setProd(true)
            setProdInfo(products.data)
        }
    }

    const getIp = async () => {
        const ip = await generalLogic.getIpClient()
        localStorage.setItem('ip', ip["ipString"])
    }

    console.log(cat)
    console.log(catInfo)

    useEffect(() => {
        setLoad(true)
        getIp()
        getProducts()
        setLoad(false)

        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || []
        setCartItems(storedCartItems)

        const loggedInStatus = localStorage.getItem('userToken')
        setIsLoggedIn(loggedInStatus ? true : false)

        const storedShippingCost = parseFloat(localStorage.getItem('shippingCost')) || 0
        setShippingCost(storedShippingCost) // Establecer el costo de envío desde localStorage

        const storedDiscountCode = localStorage.getItem('discountCode')
        const storedDiscountAmount = parseFloat(localStorage.getItem('discountAmount')) || 0
        if (storedDiscountCode) {
            setDiscountCode(storedDiscountCode)
            setDiscountApplied(true)
            setDiscountAmount(storedDiscountAmount)
        }
    }, [])

    const handleQuantityChange = (index, newQuantity) => {
        const updatedCartItems = [...cartItems]
        updatedCartItems[index].quantity = newQuantity
        updatedCartItems[index].total = updatedCartItems[index].price * newQuantity
        setCartItems(updatedCartItems)
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    }

    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index)
        setCartItems(updatedCartItems)
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    }

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.total, 0)
    }

    const calculateTax = () => {
        const subtotal = calculateSubtotal()
        return subtotal * taxRate
    }

    const calculateTotal = () => {
        const subtotal = calculateSubtotal()
        const tax = calculateTax()
        return subtotal + tax + shippingCost - discountAmount
    }

    const handleShippingChange = (event) => {
        const selectedShipping = event.target.id
        let newShippingCost = 0

        if (selectedShipping === "standart-shipping") {
            newShippingCost = 10
        } else if (selectedShipping === "express-shipping") {
            newShippingCost = 20
        } else {
            newShippingCost = 0
        }
        setTaxRate(0.15)
        setShippingCost(newShippingCost)
        localStorage.setItem('shippingCost', newShippingCost) // Guardar el costo de envío en localStorage
    }

    const applyDiscount = (code) => {
        let discount = 0

        // Puedes personalizar la lógica del descuento según el código ingresado
        if (code === 'DESCUENTO10') {
            discount = 10
        } else if (code === 'DESCUENTO20') {
            discount = 20
        }

        if (discount > 0) {
            setDiscountCode(code)
            setDiscountApplied(true)
            setDiscountAmount(discount)
            localStorage.setItem('discountCode', code)
            localStorage.setItem('discountAmount', discount.toString())
        } else {
            setDiscountApplied(false)
            setDiscountAmount(0)
            localStorage.removeItem('discountCode')
            localStorage.removeItem('discountAmount')
        }
    }

    const handleDiscountChange = (e) => {
        const code = e.target.value
        setDiscountCode(code)
    }

    const handleApplyDiscount = () => {
        applyDiscount(discountCode)
    }

    if (cartItems.length === 0) {
        return (
            <>
                <Spiner opt={load} />
                <div className="container text-center mt-5">
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        No tienes productos en tu carrito, pero aquí tenemos algunas opciones
                    </h2>
                    {prod && <Recomendations t={t} data={prodInfo} />}
                </div>
            </>
        )
    }

    return (
        <main className="main">
            <div className="page-header text-center" style={{ backgroundImage: "url('assets/images/page-header-bg.jpg')" }}>
                <div className="container">
                    <h1 className="page-title">Shopping Cart<span>Shop</span></h1>
                </div>
            </div>

            <div className="page-content">
                <div className="cart">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <table className="table table-cart table-mobile">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>IVA</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => {
                                            const itemPrice = parseFloat(item.price) || 0
                                            const totalPrice = itemPrice * item.quantity
                                            const tax = totalPrice * taxRate
                                            return (
                                                <tr key={index}>
                                                    <td className="product-col">
                                                        <div className="product">
                                                            <figure className="product-media">
                                                                <a href="!#">
                                                                    <img src={`${global.IMGProd}${item.imageUrl}`} alt={item.name} />
                                                                </a>
                                                            </figure>
                                                            <h3 className="product-title">
                                                                <a href="!#">{item.name}</a>
                                                            </h3>
                                                        </div>
                                                    </td>
                                                    <td className="price-col">${itemPrice.toFixed(2)}</td>
                                                    <td className="quantity-col">
                                                        <div className="cart-product-quantity">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                value={item.quantity}
                                                                min="1"
                                                                max="10"
                                                                step="1"
                                                                required
                                                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="total-col">${totalPrice.toFixed(2)}</td>
                                                    <td className="tax-col">${tax.toFixed(2)}</td>
                                                    <td className="remove-col">
                                                        <button className="btn-remove" onClick={() => handleRemoveItem(index)}>
                                                            <i className="icon-close"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div className="cart-bottom">
                                    <div className="cart-discount">
                                        <form action="#">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={discountCode}
                                                    onChange={handleDiscountChange}
                                                    placeholder="coupon code"
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        className="btn btn-outline-primary-2"
                                                        type="button"
                                                        onClick={handleApplyDiscount}
                                                    >
                                                        <i className="icon-long-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {discountApplied && (
                                        <div className="alert alert-info mt-3">
                                            <strong>¡Descuento Aplicado!</strong> Has utilizado el código de descuento <span style={{ color: 'blue' }}>{discountCode}</span>.
                                        </div>
                                    )}
                                </div>
                            </div>
                            <aside className="col-lg-3">
                                <div className="summary summary-cart">
                                    <h3 className="summary-title">Cart Total</h3>
                                    <table className="table table-summary">
                                        <tbody>
                                            <tr className="summary-subtotal">
                                                <td>Subtotal:</td>
                                                <td>${calculateSubtotal().toFixed(2)}</td>
                                            </tr>
                                            <tr className="summary-tax">
                                                <td>IVA (Tax):</td>
                                                <td>${calculateTax().toFixed(2)}</td>
                                            </tr>
                                            <tr className="summary-shipping">
                                                <td>Shipping:</td>
                                                <td>&nbsp</td>
                                            </tr>
                                            <tr className="summary-shipping-row">
                                                <td>
                                                    <div className="custom-control custom-radio">
                                                        <input
                                                            type="radio"
                                                            id="free-shipping"
                                                            name="shipping"
                                                            className="custom-control-input"
                                                            checked={shippingCost === 0}
                                                            onChange={handleShippingChange}
                                                        />
                                                        <label className="custom-control-label" htmlFor="free-shipping">Free Shipping</label>
                                                    </div>
                                                </td>
                                                <td>$0.00</td>
                                            </tr>
                                            <tr className="summary-shipping-row">
                                                <td>
                                                    <div className="custom-control custom-radio">
                                                        <input
                                                            type="radio"
                                                            id="standart-shipping"
                                                            name="shipping"
                                                            className="custom-control-input"
                                                            checked={shippingCost === 10}
                                                            onChange={handleShippingChange}
                                                        />
                                                        <label className="custom-control-label" htmlFor="standart-shipping">Standard:</label>
                                                    </div>
                                                </td>
                                                <td>$10.00</td>
                                            </tr>
                                            <tr className="summary-shipping-row">
                                                <td>
                                                    <div className="custom-control custom-radio">
                                                        <input
                                                            type="radio"
                                                            id="express-shipping"
                                                            name="shipping"
                                                            className="custom-control-input"
                                                            checked={shippingCost === 20}
                                                            onChange={handleShippingChange}
                                                        />
                                                        <label className="custom-control-label" htmlFor="express-shipping">Express:</label>
                                                    </div>
                                                </td>
                                                <td>$20.00</td>
                                            </tr>
                                            <tr className="summary-total">
                                                <td>Total:</td>
                                                <td>${calculateTotal().toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* Bloquear botón de checkout si no está logueado */}
                                    <button
                                        className="btn btn-outline-primary-2 btn-order btn-block"
                                        disabled={!isLoggedIn}
                                        onClick={() => !isLoggedIn && alert("Por favor, inicia sesión para continuar con la compra.")}>
                                        PROCEED TO CHECKOUT
                                    </button>
                                    {!isLoggedIn && (
                                        <div className="alert alert-warning mt-3">
                                            Necesitas iniciar sesión para proceder con el checkout.
                                        </div>
                                    )}
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
