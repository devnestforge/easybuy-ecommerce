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

const userMapper = {
  userAddressMapper
}

export default userMapper;
