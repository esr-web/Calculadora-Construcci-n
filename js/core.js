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
let PRESUPUESTO = {
  cemento: 0,
  arena: 0,
  grava: 0,
  acero: 0,
  totalUSD: 0
};

function agregarPresupuesto(cemento, arena, grava, acero, costoUSD) {
  PRESUPUESTO.cemento += cemento;
  PRESUPUESTO.arena += arena;
  PRESUPUESTO.grava += grava;
  PRESUPUESTO.acero += acero;
  PRESUPUESTO.totalUSD += costoUSD;
}

function limpiarPresupuesto() {
  PRESUPUESTO = {
    cemento: 0,
    arena: 0,
    grava: 0,
    acero: 0,
    totalUSD: 0
  };
  mostrarPresupuesto();
}
