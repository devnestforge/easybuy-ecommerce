import React from "react"
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import EnvioFacturacionForm from "../../forms/user/EnvioFacturacionForm"

export default function FormModal(props) {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      marginTop: 0, // Sin margen para eliminar separación entre header y body
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(2), // Margen para que los botones no estén tan abajo
      justifyContent: 'center', // Centrar los botones
      borderTop: 'none', // Eliminar la línea divisoria en el footer
      marginBottom: theme.spacing(2), // Margen inferior en el footer
    },
    '& .MuiDialogTitle-root': {
      textAlign: 'center', // Centrar el título
      padding: theme.spacing(2),
      borderBottom: 'none', // Eliminar la línea divisoria en el header
      marginTop: theme.spacing(4), // Añadir más margen superior al header
    },
    borderRadius: '12px', // Redondear el contorno del modal
  }))

  const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'lightblue',
    color: 'blue',
    borderRadius: 10, // Borde redondeado para el botón de cerrar
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'lightblue', // Eliminar el efecto hover
    },
  }))

  const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '20px', // Botones más redondeados
    marginLeft: theme.spacing(4), // Aumentar la separación entre los botones
    padding: theme.spacing(1, 4), // Aumentar el padding para mayor tamaño
  }))

  // Mapa que relaciona el tipo de formulario con el componente
  const formComponents = {
    addressInvoice: EnvioFacturacionForm
  }

  // Seleccionar el componente de formulario basado en props.opt
  const SelectedFormComponent = formComponents[props.opt]

  return (
    <BootstrapDialog
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') { // Evitar cerrar cuando se haga clic fuera del modal
          props.handleCloseModal()
        }
      }}
      aria-labelledby="customized-dialog-title"
      open={props.isOpen}
      maxWidth={props.modalWith}
      fullWidth={true}
      disableEscapeKeyDown={true} // Desactivar el cierre con la tecla Escape
    >
      <DialogTitle id="customized-dialog-title">
        {props.header}
      </DialogTitle>
      <CloseButton
        aria-label="close"
        onClick={props.handleCloseModal}
      >
        <CloseIcon />
      </CloseButton>
      <form action="/" method="POST" onSubmit={(e) => { props.handledSave(e) }}>
        <DialogContent dividers={false} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {SelectedFormComponent && <SelectedFormComponent formData={props.formData} />}
        </DialogContent>
        {
          props.opt !== 'roles'
          && (
            <DialogActions>
              <StyledButton type="submit" sx={{ backgroundColor: 'blue', color: 'white', '&:hover': { backgroundColor: 'darkblue' } }}>
                Guardar
              </StyledButton>
              <StyledButton onClick={props.handleCloseModal} sx={{ backgroundColor: 'lightblue', color: 'blue', '&:hover': { backgroundColor: 'lightblue' } }}>
                Cancelar
              </StyledButton>
            </DialogActions>
          )
        }
      </form>
    </BootstrapDialog>
  )
}
