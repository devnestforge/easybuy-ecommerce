import React, { useState, useEffect } from 'react'
import Recomendations from '../home/Recomendations'
import Spiner from '../../components/modals/Spiner'
import productsLogic from '../../functions/logic/productsLogic'
import t from '../../translations/i18n'
//import { useCart } from '../../functions/context/CartProvider'
import userLogic from '../../functions/logic/userLogic'

export default function ShoppingCart() {

    const [cartItems, setCartItems] = useState([])
    const [load, setLoad] = useState(false)
    const [prod, setProd] = useState(true)
    const [prodInfo, setProdInfo] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [shippingCost, setShippingCost] = useState(0)
    const [discountCode, setDiscountCode] = useState('')
    const [discountApplied, setDiscountApplied] = useState(false)
    const [discountAmount, setDiscountAmount] = useState(0)
   // const { addToCart } = useCart()

    const getProducts = async () => {

        const products = await productsLogic.getProductsLogic(0, '')
        if (products.success && products.data.length > 0) {
            setProd(true)
            setProdInfo(products.data)
        }
    }

    useEffect(() => {
        setLoad(true)
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || []
        const validatedCartItems = storedCartItems.map(item => ({
            ...item,
            price: parseFloat(item.price) || 0,
            quantity: parseInt(item.quantity) || 1,
            tarifa: parseFloat(item.tarifa) || 0,
        }))
        setCartItems(validatedCartItems)

        const storedDiscountCode = localStorage.getItem('discountCode')
        const storedDiscountAmount = localStorage.getItem('discountAmount')

        if (storedDiscountCode && storedDiscountAmount) {
            setDiscountCode(storedDiscountCode)
            setDiscountApplied(true)
            setDiscountAmount(parseFloat(storedDiscountAmount))
        }

        const storedShippingCost = localStorage.getItem('shippingCost')
        if (storedShippingCost) {
            setShippingCost(parseFloat(storedShippingCost))
        }

        getProducts()

        const token = localStorage.getItem('authToken')
        setIsLoggedIn(!!token)
        setLoad(false)
    }, [])

    const handleQuantityChange = (index, newQuantity) => {
        const updatedCartItems = [...cartItems]
        updatedCartItems[index].quantity = newQuantity
        const ivaRate = updatedCartItems[index].tarifa
        let iva = 0
        if (ivaRate !== 0) {
            iva = (updatedCartItems[index].price * ivaRate / 100 * newQuantity).toFixed(2)
        }
        const total = (updatedCartItems[index].price * newQuantity + parseFloat(iva)).toFixed(2)

        updatedCartItems[index].iva = parseFloat(iva)
        updatedCartItems[index].total = parseFloat(total)

        setCartItems(updatedCartItems)
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
        userLogic.saveViewCartLogic(updatedCartItems)
    }

    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index)
        setCartItems(updatedCartItems)
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
        userLogic.saveViewCartLogic(updatedCartItems)
    }

    /*const calculateSubtotal = () => {
        if (!Array.isArray(cartItems)) return 0
        return cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price) || 0
            const itemQuantity = parseInt(item.quantity) || 0
            return total + (itemPrice * itemQuantity)
        }, 0).toFixed(2)
    }*/

    const calculateSubtotals = () => {
        let subtotalIVA15 = 0
        let subtotalIVA12 = 0
        let subtotalIVA0 = 0
        let totalIVA = 0

        if (Array.isArray(cartItems)) {
            cartItems.forEach(item => {
                const itemPrice = parseFloat(item.precio_descuento) > 0
                    ? parseFloat(item.precio_descuento)
                    : parseFloat(item.price) // Usar precio con descuento si está disponible
                const itemQuantity = parseInt(item.quantity) || 0
                const itemTarifa = parseFloat(item.tarifa) || 0
                const itemIVA = parseFloat(item.iva) || 0 // Tomar el IVA del producto directamente

                const subtotal = itemPrice * itemQuantity

                // Calcular los subtotales según la tarifa
                if (itemTarifa === 15) {
                    subtotalIVA15 += subtotal
                } else if (itemTarifa === 12) {
                    subtotalIVA12 += subtotal
                } else {
                    subtotalIVA0 += subtotal
                }

                // Acumular el total de IVA
                totalIVA += itemIVA * itemQuantity
            })
        }

        return {
            subtotalIVA15: subtotalIVA15.toFixed(2),
            subtotalIVA12: subtotalIVA12.toFixed(2),
            subtotalIVA0: subtotalIVA0.toFixed(2),
            totalIVA: totalIVA.toFixed(2),
        }
    }

    const calculateTax = () => {
        let totalTax = 0

        if (Array.isArray(cartItems)) {
            cartItems.forEach(item => {
                // Usar el precio con descuento si está disponible, de lo contrario usar el precio original
                const itemPrice = parseFloat(item.precio_descuento) > 0
                    ? parseFloat(item.precio_descuento)
                    : parseFloat(item.price) || 0

                const itemQuantity = parseInt(item.quantity) || 0
                const itemTarifa = parseFloat(item.tarifa) || 0 // Tarifa del producto (porcentaje de IVA)

                // Calcular el impuesto solo para productos gravados
                if (itemTarifa > 0) {
                    totalTax += itemPrice * itemQuantity * itemTarifa / 100
                }
            })
        }

        return totalTax.toFixed(2)
    }

    const calculateTotal = () => {
        const { subtotalIVA15, subtotalIVA12, subtotalIVA0 } = calculateSubtotals()
        const tax = parseFloat(calculateTax()) || 0
        const shipping = parseFloat(shippingCost) || 0
        const discount = parseFloat(discountAmount) || 0

        return (
            parseFloat(subtotalIVA15) +
            parseFloat(subtotalIVA12) +
            parseFloat(subtotalIVA0) +
            tax +
            shipping -
            discount
        ).toFixed(2)
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
        setShippingCost(newShippingCost)
        localStorage.setItem('shippingCost', newShippingCost)
        
    }

    const applyDiscount = (code) => {
        let discountPercentage = 0

        // Determinar el porcentaje de descuento según el código
        if (code === 'DESCUENTO10') {
            discountPercentage = 10
        } else if (code === 'DESCUENTO20') {
            discountPercentage = 20
        }

        if (discountPercentage > 0) {
            // Aplicar el descuento a cada producto
            const updatedCartItems = cartItems.map(item => {
                const itemPrice = parseFloat(item.price) || 0
                const itemTarifa = parseFloat(item.tarifa) || 0 // Tarifa de IVA
                const itemQuantity = parseInt(item.quantity) || 0

                // Calcular el descuento para cada producto
                const discountedPrice = itemPrice - (itemPrice * discountPercentage / 100)

                // Calcular IVA si aplica
                const itemIVA = itemTarifa > 0 ? discountedPrice * (itemTarifa / 100) : 0

                // Calcular el total para este producto
                const total = (discountedPrice + itemIVA) * itemQuantity

                return {
                    ...item,
                    discountedPrice: discountedPrice.toFixed(2),
                    iva: itemIVA.toFixed(2),
                    total: total.toFixed(2)
                }
            })

            // Actualizar el carrito con los nuevos precios
            setCartItems(updatedCartItems)
            setDiscountCode(code)
            setDiscountApplied(true)
            setDiscountAmount(discountPercentage)
            localStorage.setItem('discountCode', code)
            localStorage.setItem('discountAmount', discountPercentage.toString())
        } else {
            // Eliminar el descuento si el código no es válido
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
            <br/>

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
                                            <th>Cantidad</th>
                                            <th>Subtotal</th>
                                            <th>IVA</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => {
                                            const itemPrice = parseFloat(item.price) || 0
                                            const discountPrice = parseFloat(item.precio_descuento) || itemPrice // Precio con descuento o precio base
                                            const totalDiscountPrice = (discountPrice * item.quantity).toFixed(2)
                                            const iva = (totalDiscountPrice * (parseFloat(item.tarifa) / 100)).toFixed(2) // IVA ajustado al descuento
                                            const totalWithTax = (parseFloat(totalDiscountPrice) + parseFloat(iva)).toFixed(2) // Total con IVA

                                            // Validar si el producto tiene promoción
                                            const hasPromotion =
                                                item.valor_descuento &&
                                                item.tarifa_descuento &&
                                                item.precio_descuento &&
                                                Number(item.valor_descuento) > 0 &&
                                                Number(item.tarifa_descuento) > 0 &&
                                                Number(item.precio_descuento) > 0

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
                                                    {/* Mostrar precio tachado solo si hay promoción */}
                                                    <td className="price-col">
                                                        {hasPromotion ? (
                                                            <>
                                                                <span style={{ textDecoration: "line-through", color: "red" }}>
                                                                    ${itemPrice.toFixed(2)}
                                                                </span>
                                                                <br />
                                                                <span>${discountPrice.toFixed(2)}</span>
                                                            </>
                                                        ) : <span>${itemPrice.toFixed(2)}</span>}
                                                    </td>
                                                    {/* Cantidad */}
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
                                                                onChange={(e) =>
                                                                    handleQuantityChange(index, parseInt(e.target.value))
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    {/* Total descuento (sin IVA) */}
                                                    <td className="total-col">${totalDiscountPrice}</td>
                                                    {/* IVA calculado */}
                                                    <td className="tax-col">${iva}</td>
                                                    {/* Total con IVA */}
                                                    <td className="total-with-tax-col">${totalWithTax}</td>
                                                    {/* Botón de eliminación */}
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
                                            <tr>
                                                <td>Subtotal IVA 15%:</td>
                                                <td>${calculateSubtotals().subtotalIVA15}</td>
                                            </tr>
                                            <tr>
                                                <td>Subtotal IVA 0%:</td>
                                                <td>${calculateSubtotals().subtotalIVA0}</td>
                                            </tr>
                                            <tr>
                                                <td>Total IVA:</td>
                                                <td>${calculateTax()}</td>
                                            </tr>
                                            {/* Título de Shipping */}
                                            <tr className="summary-subtotal">
                                                <td colSpan="2">
                                                    <strong><label>Envío</label></strong>
                                                    <div className="custom-control custom-radio">
                                                        <input
                                                            type="radio"
                                                            id="standart-shipping"
                                                            name="shipping"
                                                            className="custom-control-input"
                                                            onChange={handleShippingChange}
                                                            checked={shippingCost === 10}
                                                        />
                                                        <label className="custom-control-label" htmlFor="standart-shipping">
                                                            Standard Shipping - $10.00
                                                        </label>
                                                    </div>
                                                    <div className="custom-control custom-radio">
                                                        <input
                                                            type="radio"
                                                            id="express-shipping"
                                                            name="shipping"
                                                            className="custom-control-input"
                                                            onChange={handleShippingChange}
                                                            checked={shippingCost === 20}
                                                        />
                                                        <label className="custom-control-label" htmlFor="express-shipping">
                                                            Express Shipping - $20.00
                                                        </label>
                                                    </div>
                                                    <div className="custom-control custom-radio">
                                                        <input
                                                            type="radio"
                                                            id="free-shipping"
                                                            name="shipping"
                                                            className="custom-control-input"
                                                            onChange={handleShippingChange}
                                                            checked={shippingCost === 0}
                                                        />
                                                        <label className="custom-control-label" htmlFor="free-shipping">
                                                            Free Shipping
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Shipping:</td>
                                                <td>${shippingCost.toFixed(2)}</td>
                                            </tr>
                                            {discountApplied && (
                                                <tr>
                                                    <td>Discount:</td>
                                                    <td>-${discountAmount.toFixed(2)}</td>
                                                </tr>
                                            )}
                                            <tr className="summary-total">
                                                <td>Total:</td>
                                                <td>${calculateTotal()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button
                                        className="btn btn-outline-primary-2 btn-order btn-block"
                                        disabled={!isLoggedIn} // Deshabilitado si no hay sesión
                                        onClick={() => {
                                            if (isLoggedIn) {
                                                window.location.href = global.CHECKOUT
                                            }
                                        }}
                                    >
                                        Continuar con el pago
                                    </button>
                                    {!isLoggedIn && (
                                        <p className="text-danger text-center mt-2">
                                            Por favor, inicia sesión para proceder con el checkout.
                                        </p>
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

