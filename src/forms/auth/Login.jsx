import React, { useState, useEffect } from "react"
import { useSnackbar } from 'notistack'
import Spiner from '../../components/modals/Spiner'
import secutiryLogic from "../../functions/logic/securityLogic"
import auditoryLogic from "../../functions/logic/auditoryLogic"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import t from '../../translations/i18n'
import { useCart } from "../../functions/context/CartProvider"

const LoginRegister = () => {
    const [spiner, setSpiner] = useState(false)
    const { setCartItems } = useCart()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [policy, setPolicy] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [ip] = useState(localStorage.getItem('ip'))
    const [validations, setValidations] = useState({
        minLength: false,
        upperCase: false,
        lowerCase: false,
        number: false,
        specialChar: false
    })
    const { enqueueSnackbar } = useSnackbar()
    let response = []

    useEffect(() => {
        // Validate password each time it changes
        const validatePassword = (pwd) => {
            const minLength = pwd.length >= 8
            const upperCase = /[A-Z]/.test(pwd)
            const lowerCase = /[a-z]/.test(pwd)
            const number = /\d/.test(pwd)
            const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd)

            setValidations({
                minLength,
                upperCase,
                lowerCase,
                number,
                specialChar
            })
        }

        validatePassword(password)
    }, [password])

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setSpiner(true)
        try {
            const data = {
                email,
                password
            }
            response = await secutiryLogic.loginLogic(data, t)
            console.log(response)
            if (response.success) {
                localStorage.setItem("authToken", response.data.userData[0].token)
                localStorage.setItem("authEmail", email)
                setCartItems(response.data.viewCartDetail || [])
                if (response.data.viewCart && response.data.viewCart.length > 0) {
                    const firstCartItem = response.data.viewCart[0];
                    localStorage.setItem('shippingCost', firstCartItem.envio_id || "");
                    localStorage.setItem('envio', firstCartItem.envio || "");
                    localStorage.setItem('discountCode', firstCartItem.codigo_oferta || "");
                    localStorage.setItem('discountAmount', firstCartItem.descuento || "");
                }
                window.location.href = "/home";
            }
            enqueueSnackbar(response.message, {
                variant: response.variant,
                anchorOrigin: {
                    vertical: global.SNACKBARVER,
                    horizontal: global.SNACKBARHOR
                }
            })
        } catch (e) {
            enqueueSnackbar(t('general_error_message'), {
                variant: t('code_label_error'),
                anchorOrigin: {
                    vertical: global.SNACKBARVER,
                    horizontal: global.SNACKBARHOR
                }
            })
        }
        setSpiner(false)
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setSpiner(true)
        try {

            const data = {
                email,
                password,
                policy,
                "creation_user": 0,
                "creation_ip": ip,
                "creation_date": new Date(),
            }

            response = await secutiryLogic.registerLogic(data, t)
            if (response.success) {
                window.location.href = "/home";
            } else {
            }
            enqueueSnackbar(response.message, {
                variant: response.variant,
                anchorOrigin: {
                    vertical: global.SNACKBARVER,
                    horizontal: global.SNACKBARHOR
                }
            })
        } catch (e) {
            const data = {
                "section_error": "loginRegister.jsx front",
                "detail_error": "login eccomerce front",
                "mensaje_error": e.message,
                "user_transac": 0,
                "module_transac": "Front loginRegister.jsx",
                "operation_date": new Date(),
                "operation_user": 0,
                "operation_ip": ip,
                "env": 2
            }
            auditoryLogic.catchErrorLogic(data)
            enqueueSnackbar(t('general_error_message'), {
                variant: t('code_label_error'),
                anchorOrigin: {
                    vertical: global.SNACKBARVER,
                    horizontal: global.SNACKBARHOR
                }
            })
        }
        setSpiner(false)
    }

    const styles = {
        validationInfo: {
            marginTop: '20px',
        },
        validationTitle: {
            fontSize: '16px',
            marginBottom: '10px',
            color: '#333',
        },
        validationRow: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        validationSpan: {
            display: 'block',
            fontSize: '14px',
            marginBottom: '5px',
        },
        valid: {
            color: 'green',
        },
        invalid: {
            color: 'red',
        },
    }

    return (
        <>
            <Spiner opt={spiner} />
            <div className="modal fade" id="signin-modal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="icon-close"></i></span>
                            </button>

                            <div className="form-box">
                                <div className="form-tab">
                                    <ul className="nav nav-pills nav-fill nav-border-anim" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="signin-tab" data-toggle="tab" href="#signin" role="tab" aria-controls="signin" aria-selected="true">{t('auth.login_label')}</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">{t('auth.register_label')}</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="tab-content-5">
                                        <div className="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab">
                                            <form action="!#">
                                                <div className="form-group">
                                                    <label htmlFor="singin-email">{t('auth.email_input')} *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="singin-email"
                                                        value={email}
                                                        maxLength={50}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        name="singin-email"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="singin-password">{t('auth.password_input')} *</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="singin-password"
                                                        maxLength={50}
                                                        name="singin-password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>

                                                <div className="form-footer">
                                                    <button
                                                        onClick={(e) => handleLogin(e)}
                                                        className="btn btn-primary">
                                                        <span>{t('Ingresar')}</span>
                                                        <i className="icon-long-arrow-right"></i>
                                                    </button>
                                                    <a href="#restore-pass-modal" data-toggle="modal" className="forgot-link">{t('auth.forgotPassword_button')}</a>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                                            <form action="!#">
                                                <div className="form-group">
                                                    <label htmlFor="register-email">{t('auth.email_input')} *</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="register-email"
                                                        value={email}
                                                        maxLength={50}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        name="register-email"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="register-password">{t('auth.password_input')} *</label>
                                                    <div className="input-group">
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            className="form-control"
                                                            id="register-password"
                                                            name="register-password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                        <div className="input-group-append">
                                                            <span
                                                                className="input-group-text"
                                                                onClick={toggleShowPassword}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-footer">
                                                    <button
                                                        type="submit"
                                                        onClick={(e) => handleRegister(e)}
                                                        className="btn btn-primary">
                                                        <span>{t('auth.register_label')}</span>
                                                        <i className="icon-long-arrow-right"></i>
                                                    </button>
                                                    <br />
                                                    <br />
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            onChange={(e) => setPolicy(e.target.checked)}
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="register-policy"
                                                            checked={policy}
                                                        />
                                                        <label className="custom-control-label" htmlFor="register-policy">{t('auth.privacy_policy_check')} *</label>
                                                    </div>
                                                    <br />
                                                    <br />
                                                </div>
                                            </form>
                                            <div className="validation-info" style={styles.validationInfo}>
                                                <h5 style={styles.validationTitle}>{t('errors.password_validation_title')}</h5>
                                                <div className="row" style={styles.validationRow}>
                                                    <div className="col-md-6">
                                                        <span style={{ ...styles.validationSpan, ...(validations.minLength ? styles.valid : styles.invalid) }}>
                                                            {t('errors.password_min_length')}
                                                        </span>
                                                        <span style={{ ...styles.validationSpan, ...(validations.upperCase ? styles.valid : styles.invalid) }}>
                                                            {t('errors.password_uppercase')}
                                                        </span>
                                                        <span style={{ ...styles.validationSpan, ...(validations.lowerCase ? styles.valid : styles.invalid) }}>
                                                            {t('errors.password_lowercase')}
                                                        </span>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span style={{ ...styles.validationSpan, ...(validations.number ? styles.valid : styles.invalid) }}>
                                                            {t('errors.password_number')}
                                                        </span>
                                                        <span style={{ ...styles.validationSpan, ...(validations.specialChar ? styles.valid : styles.invalid) }}>
                                                            {t('errors.password_special_char')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginRegister
