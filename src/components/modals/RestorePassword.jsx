import React, { useState } from "react"
import { useSnackbar } from 'notistack'
import Spiner from './Spiner'
import secutiryLogic from "../../functions/logic/securityLogic"
import t from '../../translations/i18n'

const RestorePassword = () => {
    const [spiner, setSpiner] = useState(false)
    const [email, setEmail] = useState('')
    const { enqueueSnackbar } = useSnackbar()
    let response = []

    const handleRestore = async (e) => {
        e.preventDefault()
        setSpiner(true)
        try {
            const link = window.location.origin + '' + global.RESETPASSWORDLINK;
            const data = {
                email,
                link
            }
            response = await secutiryLogic.sendLinkLogic(data, t)
            if (response.success) {
                //window.location.href = "/home";
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

    return (
        <>
            <Spiner opt={spiner} />
            <div className="modal fade" id="restore-pass-modal" tabIndex="-1" role="dialog" aria-hidden="true">
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
                                            <a className="nav-link active" id="signin-tab" data-toggle="tab" href="#signin" role="tab" aria-controls="signin" aria-selected="true">{t('restore_pass_label')}</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="tab-content-5">
                                        <div className="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab">
                                            <form action="!#">
                                                <div className="form-group">
                                                    <label htmlFor="singin-email">{t('email_input')} *</label>
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
                                                <br/><br/><br/>
                                                <div className="form-footer">
                                                    <button
                                                        onClick={(e) => handleRestore(e)}
                                                        className="btn btn-outline-primary-2">
                                                        <span>{t('restore_button')}</span>
                                                        <i className="icon-long-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </form>
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

export default RestorePassword
