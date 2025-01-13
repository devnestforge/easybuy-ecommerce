import React, { useState } from 'react'
import Spiner from '../../components/modals/Spiner'
import secutiryLogic from "../../functions/logic/securityLogic"
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import '../../scss/_global.scss'

export default function ResetPasword() {
    const param = useParams()
    const [spiner, setSpiner] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const { enqueueSnackbar } = useSnackbar()

    const keyEnter = (event) => {
        if (event.keyCode === 13) {
            handleChangePassword()
        }
    }

    const handleChangePassword = async (event) => {
        setSpiner(true)
        if ((password !== "" & passwordConfirm !== "") && (password === passwordConfirm)) {
            const resp = await secutiryLogic.changePasswordLogic(password, passwordConfirm, param.token)
            enqueueSnackbar(resp.message, {
                variant: resp.variant,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            if(resp.success) {
                setTimeout(function () {
                    window.location.reload()
                }, global.DELAY)
                setPasswordConfirm('')
                setPassword('')
            }
        } else {
            enqueueSnackbar('Debe ingresar las contraseñas y tienen que coincidir', {
                variant: 'warning',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        }
        setSpiner(false)
    }
    return (
        <>
            <Spiner opt={spiner} />
            <div className="page-content">
                <div className="container">
                    <br/>
                    <div className="touch-container row justify-content-center">
                        <div className="col-md-9 col-lg-7">
                            <div className="text-center">
                                <p className="lead text-primary">
                                    Cambiar contraseña
                                </p>
                                <p className="mb-3">Recuerda que tu contraseña antigua se actualizará. Asegúrate de guardar la nueva para futuras referencias. Su contraseña se actualizará correctamente una vez completado el proceso.</p>
                            </div>

                            <form action="#" className="contact-form mb-2">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="input-group mb-3">
                                            <input maxLength="30" minLength="1" value={password} onKeyDown={(e) => keyEnter(e)} onChange={({ target }) => setPassword(target.value)} type="password" className="form-control" placeholder='Ingresar su contraseña' />
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className={global.LOGIN_FA_PASS} ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="input-group mb-3">
                                            <input maxLength="30" minLength="1" value={passwordConfirm} onKeyDown={(e) => keyEnter(e)} onChange={({ target }) => setPasswordConfirm(target.value)} type="password" className="form-control" placeholder='Repita su contraseña' />
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className={global.LOGIN_FA_PASS} ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-center">
                                    <button onClick={(e) => { e.preventDefault(); handleChangePassword() }} type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                                        <span>Recuperar contraseña</span>
                                        <i className="icon-long-arrow-right"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}