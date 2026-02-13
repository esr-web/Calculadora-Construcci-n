function redondear(valor, decimales = 2) {
  return Number(valor.toFixed(decimales));
}

function costo(cantidad, precio) {
  return redondear(cantidad * precio);
}
function aplicarDesperdicio(cantidad, porcentaje) {
  return cantidad * (1 + porcentaje / 100);
}

function convertirMoneda(valorUSD, moneda) {
  return valorUSD * MONEDAS[moneda];
}
