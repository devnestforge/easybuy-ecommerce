import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import '../../scss/_Spinner.scss';

const Spiner = (props) => {
  const dialogRef = useRef(null);

  return (
    <Dialog
      open={props.opt}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
      ref={dialogRef} // Usamos el ref directamente
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
  );
};

export default Spiner;
