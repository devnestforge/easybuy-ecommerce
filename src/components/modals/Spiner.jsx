import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import '../../scss/_Spinner.scss'

const Spiner = (props) => {
  return (
    <Dialog
      open={props.opt}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DialogContent style={{ textAlign: 'center' }}>
        <DialogContentText
          id="alert-dialog-description"
          className="spinner-container"
        >
          <div className="loader"></div>
        </DialogContentText>
      </DialogContent>
      <DialogTitle className="text-center">
        <b>Cargando...</b>
      </DialogTitle>
    </Dialog>
  )
}

export default Spiner
