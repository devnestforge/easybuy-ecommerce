const productMapper = (data) => {
  let prodMapper = [];
  for (var i = 0; i < data.length; i++) {
    prodMapper[i] = {
      empresa_id: data[i].empresa_id ?? '',
      id: data[i].prod_id ?? '',
      cat_name: data[i].cat_name ?? '',
      prod_descripcion: data[i].prod_descripcion ?? '',
      prod_name: data[i].prod_name ?? '',
      prod_precio: parseFloat(data[i].prod_precio) || 0,
      iva_precio: parseFloat(data[i].iva_precio) || 0,
      total_precio: parseFloat(data[i].total_precio) || 0,
      img_id: data[i].img_id ?? '',
      alto: parseFloat(data[i].alto) || 0,
      ancho: parseFloat(data[i].ancho) || 0,
      anio_fabricacion: parseInt(data[i].anio_fabricacion) || 0,
      dimensiones: data[i].dimensiones ?? '',
      fabricante: data[i].fabricante ?? '',
      fecha_lanzamiento: data[i].fecha_lanzamiento ?? '',
      garantia: data[i].garantia ?? '',
      observacion: data[i].observacion ?? '',
      tarifa: parseFloat(data[i].tarifa) || 0,
      tarifa_descuento: parseFloat(data[i].tarifa_descuento) || 0,
      valor_descuento: parseFloat(data[i].valor_descuento) || 0,
      precio_descuento: parseFloat(data[i].precio_descuento) || 0,
      iva_descuento: parseFloat(data[i].iva_descuento) || 0,
      url_imagen: data[i].url_imagen ?? ''
    }
    prodMapper.push(prodMapper[i]);
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

const reviewsMapper = (data) => {
  let prodMapper = [];
  for (var i = 0; i < data.length; i++) {
    prodMapper[i] = {
      id: data[i].id ?? '',
      user: data[i].name ?? '',
      rating: data[i].rate_porcentaje ?? '',
      date: data[i].creation_date ?? '',
      title: data[i].tittle_review ?? '',
      content: data[i].review || ''
    }
    prodMapper.push(prodMapper[i]);
  }
  return prodMapper;
}

const imgProdMapper = (data) => {
  let prodMapper = [];
  for (var i = 0; i < data.length; i++) {
    prodMapper[i] = {
      id: data[i].id ?? '',
      url_imagen: data[i].url_imagen ?? ''
    }
    prodMapper.push(prodMapper[i]);
  }
  return prodMapper;
}

const productsMapper = {
  productMapper,
  categoriMapper,
  productIdMapper,
  reviewsMapper,
  imgProdMapper
}

export default productsMapper;
