import React from 'react'
import { DialogTitle, Dialog, DialogContent, DialogContentText } from '@material-ui/core'

const Spiner = (props) => {
  return (
        <Dialog open={props.opt} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" 
        style={{position: "fixed", zIndex: "1400", inset: "0px"}}>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className="text-center mt-4 mb-4">
                <div className="loader mt-2"></div>
                </DialogContentText>
            </DialogContent>
            <DialogTitle className='mt-2' id="alert-dialog-title text-center "><b>Cargando... </b></DialogTitle>
        </Dialog>
  )
}

export default Spiner
