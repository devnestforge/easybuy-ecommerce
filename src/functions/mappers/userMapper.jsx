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
      provincia_name: data[i].provincia_name ?? '',
      canton_name: data[i].canton_name ?? '',
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

const userProfileMapper = (data) => {
  let prodMapper = [];
  for (var i = 0; i < data.length; i++) {
    prodMapper[i] = {
      identification: data[i].identification ?? '',
      nombres: data[i].nombres ?? '',
      apellidos: data[i].apellidos ?? '',
      direction: data[i].direction ?? '',
      descuento: data[i].descuento ?? '',
      cellphone: data[i].phone ?? '',
      gender: data[i].gender ?? '',
      provincia_id: data[i].provincia_id ?? 0,
      parroquia_id: data[i].parroquia_id ?? 0,
      fecha_nacimiento: data[i].fecha_nacimiento ?? '',
      email: data[i].email ?? ''
    }
    prodMapper.push();
  }
  return prodMapper;
}

const userMapper = {
  userAddressMapper,
  userTrackingMapper,
  userProfileMapper
}

export default userMapper;
