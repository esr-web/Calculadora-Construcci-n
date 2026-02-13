function mostrarPresupuesto() {
  const moneda = document.getElementById("moneda").value;
  const total = convertirMoneda(PRESUPUESTO.totalUSD, moneda);

  document.getElementById("presupuesto").innerHTML = `
    <h3>Resumen acumulado</h3>
    <ul>
      <li>Cemento: ${redondear(PRESUPUESTO.cemento)} sacos</li>
      <li>Arena: ${redondear(PRESUPUESTO.arena, 3)} m³</li>
      <li>Grava: ${redondear(PRESUPUESTO.grava, 3)} m³</li>
      <li>Acero: ${redondear(PRESUPUESTO.acero)} kg</li>
    </ul>
    <h3>Total: ${moneda} ${redondear(total)}</h3>
  `;
}
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
// Guardar presupuesto en localStorage
function guardarPresupuesto() {
  localStorage.setItem("presupuestoConstruccion", JSON.stringify(PRESUPUESTO));
}

// Cargar presupuesto desde localStorage
function cargarPresupuesto() {
  const datos = localStorage.getItem("presupuestoConstruccion");
  if (datos) {
    PRESUPUESTO = JSON.parse(datos);
    mostrarPresupuesto();
  }
}
