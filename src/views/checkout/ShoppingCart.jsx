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
    const [ivaVal, setIvaVal] = useState(0)

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

    useEffect(() => {
        // Recuperamos los productos desde el localStorage
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const validatedCartItems = storedCartItems.map(item => ({
            ...item,
            price: parseFloat(item.price) || 0,
            quantity: parseInt(item.quantity) || 1,
            tarifa: parseFloat(item.tarifa) || 0,
        }));
        setCartItems(validatedCartItems);
    
        // Recuperamos el descuento desde el localStorage
        const storedDiscountCode = localStorage.getItem('discountCode');
        const storedDiscountAmount = localStorage.getItem('discountAmount');
        
        if (storedDiscountCode && storedDiscountAmount) {
            setDiscountCode(storedDiscountCode);
            setDiscountApplied(true);
            setDiscountAmount(parseFloat(storedDiscountAmount));
        }
    
        // Recuperamos el costo de envío desde el localStorage
        const storedShippingCost = localStorage.getItem('shippingCost');
        if (storedShippingCost) {
            setShippingCost(parseFloat(storedShippingCost));
        }
    
    }, []);

    const handleQuantityChange = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];

        // Actualizar la cantidad
        updatedCartItems[index].quantity = newQuantity;

        // Verificar si la tarifa es 0
        const ivaRate = updatedCartItems[index].tarifa;

        // Si tarifa es 0, el IVA debe ser 0
        let iva = 0;
        if (ivaRate !== 0) {
            iva = (updatedCartItems[index].price * ivaRate / 100 * newQuantity).toFixed(2);
            setIvaVal(iva) // IVA con 2 decimales
        }

        // Calcular el total (incluyendo IVA si no es 0)
        const total = (updatedCartItems[index].price * newQuantity + parseFloat(iva)).toFixed(2); // Total con 2 decimales

        // Actualizar los valores
        updatedCartItems[index].iva = parseFloat(iva);  // Guardamos el IVA como número
        updatedCartItems[index].total = parseFloat(total);  // Guardamos el total como número

        // Actualizar el estado y el localStorage
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };




    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index)
        setCartItems(updatedCartItems)
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    }

    const calculateSubtotal = () => {
        if (!Array.isArray(cartItems)) return 0;
        return cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price) || 0;
            const itemQuantity = parseInt(item.quantity) || 0;
            return total + (itemPrice * itemQuantity);
        }, 0).toFixed(2); // Subtotal con 2 decimales
    };

    const calculateTax = () => {
        if (!Array.isArray(cartItems)) return 0;
        return cartItems.reduce((totalIva, item) => {
            const itemPrice = parseFloat(item.price) || 0;
            const itemQuantity = parseInt(item.quantity) || 0;
            const itemTarifa = parseFloat(item.tarifa) || 0;
            const itemIva = (itemPrice * itemQuantity * itemTarifa / 100);
            return totalIva + itemIva;
        }, 0).toFixed(2); // Total IVA con 2 decimales
    };

    const calculateTotal = () => {
        const subtotal = parseFloat(calculateSubtotal()) || 0;
        const tax = parseFloat(calculateTax()) || 0;
        const shipping = parseFloat(shippingCost) || 0;
        const discount = parseFloat(discountAmount) || 0;
        return (subtotal + tax + shipping - discount).toFixed(2); // Total con 2 decimales
    };

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
        localStorage.setItem('shippingCost', newShippingCost)
    }

    const applyDiscount = (code) => {
        let discount = 0;
    
        if (code === 'DESCUENTO10') {
            discount = 10;
        } else if (code === 'DESCUENTO20') {
            discount = 20;
        }
    
        if (discount > 0) {
            setDiscountCode(code);
            setDiscountApplied(true);
            setDiscountAmount(discount);
            localStorage.setItem('discountCode', code);
            localStorage.setItem('discountAmount', discount.toString());
        } else {
            setDiscountApplied(false);
            setDiscountAmount(0);
            localStorage.removeItem('discountCode');
            localStorage.removeItem('discountAmount');
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
                                            const itemPrice = parseFloat(item.price) || 0;
                                            const totalPrice = (itemPrice * item.quantity).toFixed(2);
                                            const discountPrice = parseFloat(item.precio_descuento) || itemPrice; // Precio con descuento o precio base
                                            const totalDiscountPrice = (discountPrice * item.quantity).toFixed(2);
                                            const iva = (totalDiscountPrice * (parseFloat(item.tarifa) / 100)).toFixed(2); // IVA ajustado al descuento
                                            const totalWithTax = (parseFloat(totalDiscountPrice) + parseFloat(iva)).toFixed(2); // Total con IVA

                                            // Validar si el producto tiene promoción
                                            const hasPromotion =
                                                item.valor_descuento &&
                                                item.tarifa_descuento &&
                                                item.precio_descuento &&
                                                Number(item.valor_descuento) > 0 &&
                                                Number(item.tarifa_descuento) > 0 &&
                                                Number(item.precio_descuento) > 0;

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
                                                        {hasPromotion && (
                                                            <span style={{ textDecoration: "line-through", color: "red" }}>
                                                                ${itemPrice.toFixed(2)}
                                                            </span>
                                                        )}
                                                        {hasPromotion && <br />}
                                                        <span>${discountPrice.toFixed(2)}</span>
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
                                            );
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
                                                <td>${Number(calculateSubtotal()).toFixed(2)}</td>
                                            </tr>

                                            {/* Título de Shipping */}
                                            <tr className="summary-subtotal">
                                                <td colSpan="2">
                                                    <h4>Shipping</h4>
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

                                            {/* Descuento */}
                                            {discountApplied && (
                                                <tr>
                                                    <td>Discount:</td>
                                                    <td>-${discountAmount.toFixed(2)}</td>
                                                </tr>
                                            )}

                                            {/* Impuestos */}
                                            <tr>
                                                <td>Tax:</td>
                                                <td>${calculateTax()}</td>
                                            </tr>

                                            {/* Total */}
                                            <tr className="summary-total">
                                                <td>Total:</td>
                                                <td>${calculateTotal()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <a href="#" className="btn btn-outline-primary-2 btn-order btn-block">
                                        Proceed to Checkout
                                    </a>
                                </div>
                            </aside>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

