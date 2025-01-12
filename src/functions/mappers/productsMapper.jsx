const productMapper = (data) => {
  let prodMapper = [];
  for (var i = 0; i < data.length; i++) {
    prodMapper[i] = {
      id: data[i].prod_id ?? '',
      cat_name: data[i].cat_name ?? '',
      prod_descripcion: data[i].prod_descripcion ?? '',
      prod_name: data[i].prod_name ?? '',
      prod_precio: data[i].prod_precio ?? '',
      img_id: data[i].img_id ?? '',
      alto: data[i].alto ?? '',
      ancho: data[i].ancho ?? '',
      anio_fabricacion: data[i].anio_fabricacion ?? '',
      dimensiones: data[i].dimensiones ?? '',
      fabricante: data[i].fabricante ?? '',
      fecha_lanzamiento: data[i].fecha_lanzamiento ?? '',
      garantia: data[i].garantia ?? '',
      observacion: data[i].observacion ?? '',
      url_imagen: data[i].url_imagen ?? ''
    }
    prodMapper.push();
  }
  return prodMapper;
}

const productIdMapper = (data) => {
  let prodMapper = [];
  for (var i = 0; i < data.length; i++) {
    prodMapper[i] = {
      id: data[i].prod_id ?? '',
      prod_descripcion: data[i].prod_descripcion ?? '',
      cat_name: data[i].cat_name ?? '',
      prod_name: data[i].prod_name ?? '',
      prod_precio: data[i].prod_precio ?? '',
      img_id: data[i].img_id ?? '',
      url_imagen: data[i].url_imagen ?? ''
    }
    prodMapper.push();
  }
  return prodMapper;
}

const categoriMapper = (data) => {
  let prodMapper = [];
  for (var i = 0; i < data.length; i++) {
    prodMapper[i] = {
      id: data[i].id ?? '',
      nemonico_cat: data[i].nemonico_cat ?? '',
      nombre: data[i].nombre ?? '',
      img_path: data[i].img_path ?? ''
    }
    prodMapper.push();
  }
  return prodMapper;
}


const productsMapper = {
  productMapper,
  categoriMapper,
  productIdMapper
}

export default productsMapper;
