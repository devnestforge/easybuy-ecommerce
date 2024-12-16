const productMapper = (data) => {
  let prodMapper = [];
  for (var i = 0; i < data.length; i++) {
    prodMapper[i] = {
      id: data[i].prod_id ?? '',
      promo_name: data[i].promo_name ?? '',
      prod_name: data[i].prod_name ?? '',
      precio_real: data[i].precio_real ?? '',
      valor_descuento: data[i].valor_descuento ?? '',
      url_imagen: data[i].url_imagen ?? ''
    }
    prodMapper.push();
  }
  return prodMapper;
}

const productsMapper = {
  productMapper
}

export default productsMapper;
