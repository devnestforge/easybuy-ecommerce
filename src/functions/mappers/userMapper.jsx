const userAddressMapper = (data) => {
  let prodMapper = [];
  for (var i = 0; i < data.length; i++) {
    prodMapper[i] = {
      id: data[i].id ?? '',
      usuario_id: data[i].usuario_id ?? '',
      nombres: data[i].nombres ?? '',
      apellidos: data[i].apellidos ?? '',
      direccion: data[i].direccion ?? '',
      calle: data[i].calle ?? '',
      referencia: data[i].referencia ?? '',
      provincia: data[i].provincia ?? '',
      ciudad: data[i].ciudad ?? '',
      codigo_postal: data[i].codigo_postal ?? '',
      telefono_contacto: data[i].telefono_contacto ?? '',
      es_principal: data[i].es_principal ?? ''
    }
    prodMapper.push();
  }
  return prodMapper;
}

const userTrackingMapper = (data) => {
  let prodMapper = [];
  for (var i = 0; i < data.length; i++) {
    prodMapper[i] = {
      fecha_pedido: data[i].fecha_pedido ?? '',
      fecha: data[i].fecha_ingreso ?? '',
      fecha_finalizacion: data[i].fecha_finalizacion ?? '',
      descripcion: data[i].descripcion ?? '',
      notas: data[i].notas ?? '',
      completado: data[i].nombre_parametro === "Activo" ? true : false,
      nombre2: data[i].nombre2 ?? ''
    }
    prodMapper.push();
  }
  return prodMapper;
}

const userMapper = {
  userAddressMapper,
  userTrackingMapper
}

export default userMapper;
