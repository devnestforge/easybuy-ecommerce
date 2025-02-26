import React, { useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import '../../scss/_Spinner.scss'

const Spiner = (props) => {
  const dialogRef = useRef(null);
  const { opt = false } = props;

  return (
    <Dialog
      open={opt}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
      ref={dialogRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DialogContent style={{ textAlign: 'center' }}>
        <div className="spinner-container">
          <div className="loader"></div>
        </div>
      </DialogContent>
      <DialogTitle className="text-center">
        <b>Cargando...</b>
      </DialogTitle>
    </Dialog>
  )
}

export default Spiner;
