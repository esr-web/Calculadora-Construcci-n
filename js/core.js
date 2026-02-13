function redondear(valor, decimales = 2) {
  return Number(valor.toFixed(decimales));
}

function costo(cantidad, precio) {
  return redondear(cantidad * precio);
}
